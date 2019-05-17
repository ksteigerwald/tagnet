import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, LineState, Line } from '../types'
import { apolloClient } from '@/constants/graphql'
import { linesQry, searchQry, linesInsert } from '@/constants/lines.ql'
import { Subject, fromEvent, of, pipe } from 'rxjs';
import { pluck, map, debounceTime, tap,
         distinctUntilChanged, switchMap } from 'rxjs/operators';
const uuidv1 = require('uuid/v1');

type LineGetter = GetterTree<LineState, RootState> 

export const state: LineState = {
    lines: [],
    wall: []
}

export const mutations: MutationTree<LineState> = {
    addLine(state: LineState, newLine: Line): void {
        const lineCopy = Object.assign({}, newLine) 
        state.lines.push(lineCopy)
    }
}

export const actions: ActionTree<LineState, RootState> = {

  async createLine({ commit, dispatch, rootState }, payload:Line) {
      console.log("LINE", payload)
    const response: any = await apolloClient.mutate({
      mutation: linesInsert,
      variables: {
        objects: [{
          label: payload.label,
          memo_id: payload.memo_id
        }]
      }
    })

		let line: Line = response.data.insert_lines.returning.pop()
		commit('addLine', line)
    },

    async loadLines( { commit, dispatch, rootState} ) {
        const response: any = await apolloClient.query({
            query: linesQry
        })

		console.log(response.data.lines)
        state.lines = response.data.lines
        state.wall = response.data.lines
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

export const getters: GetterTree<LineState, RootState> = {
    lines: (state, getters, rootState) => state.lines,
    sortedLines: (state, getters, rootState) => state.lines
        .sort((a:any, b:any) => {
            return (<any>a.logged) - (<any>b.logged)
        })
        .reduce((acc: any, cur: any) => {
            //TODO: use grqphql to sort this
            let m = rootState.memos.memos.filter( (m) =>{ 
                return m.id === cur.memo_id }) 

            let memo = m[0]
            let t = rootState.tags.tags.filter( t => t.id === memo.tag_id)[0]
            let key: string = memo.label

            if(!acc[key]) {
                acc[key] = []
            }

            let obj = Object.assign({}, cur, { type: t.label })
            acc[key].push(obj)
            return acc
        }, {}),
}

export const lines:Module<LineState, RootState> ={
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
