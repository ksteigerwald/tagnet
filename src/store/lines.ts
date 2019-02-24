import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, LineState, Line } from '../types'
import { apolloClient } from '@/constants/graphql'
import { linesQry, linesInsert } from '@/constants/lines.ql'
const uuidv1 = require('uuid/v1');

type LineGetter = GetterTree<LineState, RootState> 

export const state: LineState = {
    lines: []
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
				uuid: uuidv1(),
				label: payload.label,
				memo_id: payload.memo_id,
				logged: payload.logged
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

        state.lines = response.data.lines
    }

}

export const getters: GetterTree<LineState, RootState> = {
    lines: (state, getters, rootState) => state.lines,
    sortedLines: (state, getters, rootState) => state.lines
        .sort((a:any, b:any) => {
            return (<any>b.logged) - (<any>a.logged)
        })
        .reduce((acc: any, cur: any) => {
            let m = rootState.memos.memos.filter( m => m.id === cur.memo_id)[0]
            let t = rootState.tags.tags.filter( t => t.id === m.tag_id)[0]
            let key: string = m.label

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
