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

            dispatch('memos/loadWall', null, { root: true }) 
        },

        async loadLines( { commit, dispatch, rootState} ) {
            const response: any = await apolloClient.query({
                query: linesQry
            })

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
    }

        export const lines:Module<LineState, RootState> ={
            state,
            getters,
            mutations,
            actions,
            namespaced: true
        }
