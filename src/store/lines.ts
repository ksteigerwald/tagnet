import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, LineState, Line } from '../types'
import { apolloClient } from '@/constants/graphql'
import { linesQry, searchQry, linesInsert, linesByMemoId, updateLineCode, updateLineMeta } from '@/constants/lines.ql'
import { Subject, fromEvent, of, pipe } from 'rxjs';
import { pluck, map, debounceTime, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Hashids from 'hashids'

interface IGroupByLines {
    [key: string] : Line
} 

let hashid = new Hashids('LINE')

type LineGetter = GetterTree<LineState, RootState> 

export const state: LineState = {
    lines: []
}

export const mutations: MutationTree<LineState> = {

    addLine(state: LineState, newLine: Line): void {
        const lineCopy = Object.assign({}, newLine) 
        state.lines.push(lineCopy)
    },

    updateLine(state: LineState, newLine: Line): void {
        const lineCopy = Object.assign({}, newLine) 
        let filtered = state.lines.filter(line => line.id != newLine.id)
        filtered.push(newLine)
        state.lines = filtered
    },
}

export const actions: ActionTree<LineState, RootState> = {

    async createLine({ commit, dispatch, rootState }, payload:Line) {

        const response: any = await apolloClient.mutate({
            mutation: linesInsert,
            variables: {
                objects: [{
                    label: payload.label,
                    memo_id: payload.memo_id,
                    format_id: payload.format_id || 1,
                    meta: payload.meta || null
                }]
            }
        })

        let line: Line = response.data.insert_lines.returning.pop()
        await dispatch('updateLineCode', line)

    },

    async updateLineCode({ commit, dispatch, rootState }, line:Line) {

        let code = hashid.encode(line.id)

        const response: any = await apolloClient.mutate({
            mutation: updateLineCode,
            variables: {
                id: line.id,
                code: code
            }
        })

        commit('addLine', line)
    },

    async updateLineMeta({ commit, dispatch, rootState }, line:Line) {

        const response: any = await apolloClient.mutate({
            mutation: updateLineMeta,
            variables: {
                id: line.id,
                meta: line.meta
            }
        })

        commit('updateLine', line)
    },

    async loadLines( { commit, dispatch, rootState} ) {
        const response: any = await apolloClient.query({
            query: linesQry
        })

        state.lines = response.data.lines
    },

    async linesByMemo( { commit, dispatch, rootState }, memoId: number ) {
        const response: any = await apolloClient.query({
            query: linesByMemoId,
            variables: { input: memoId }	
        })
        console.log(response.data.lines)
        state.lines = response.data.lines
    },

    async searchLines( { commit, dispatch, rootState}, term: string ) {

        let vars: string = `%${term}%`

        const response: any = await apolloClient.query({
            query: searchQry,
            variables: { input: vars }
        })

        state.lines = response.data.lines
        dispatch('sortedLines') 
    }
}

function _d(date: string): number {
    return new Date(date).getTime()
}

export const getters: GetterTree<LineState, RootState> = {
    lines: (state, getters, rootState) => state.lines,
    sortedLines: (state, getters, rootState) => state.lines.sort((a,b) => _d(b.created)  - _d(a.created)),

    memoLines: (state, getters, rootState) => (memoId:number) =>  {
        return state.lines.filter(line => line.memo_id === memoId) 
    },

    formatSelect: (state, getters, rootState) => (formatId:number) =>  {
        return getters.lines.filter((line: Line) => line.format_id === formatId) 
    },

    linesGroupBy: (state, getters, rootState) => {
        return getters.sortedLines.reduce( (a: any, c: Line) => {
           let d = c.created.substr(0,10)
           if(!a[d]) { a[d] = [] }
           a[d].push(c)
           return a
        }, {});
    }
}

export const lines:Module<LineState, RootState> ={
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
