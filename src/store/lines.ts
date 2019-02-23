import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, LineState, Line } from '../types'
import { apolloClient } from '@/constants/graphql'
import { linesQry, linesInsert } from '@/constants/lines.ql'
const uuidv1 = require('uuid/v1');

type LineGetter = GetterTree<LineState, RootState> 

export const state: LineState = {
    lines: [
/*        { memoId: 'chFRfjc7B9pqfoJBJu8Lg', label: '1 hour of practice', logged: '2019-02-18T03:38:39.760Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 2 of Linux Academy', logged: '2019-02-18T03:43:12.337Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 3 of Linux Academy', logged: '2019-02-18T03:44:23.063Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 4 of Linux Academy', logged: '2019-02-20T03:44:23.063Z' }, */
    ]
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

        response.data.lines.forEach((line: Line) => commit('addLine', line))
    }

}

export const getters: GetterTree<LineState, RootState> = {
    lines: (state, getters, rootState) => state.lines,
    sortedLines: (state, getters, rootState) => state.lines
        .sort((a, b) => {
            return new Date(b.logged) - new Date(a.logged) 
        })
        .reduce((acc: any, cur: any) => {
            let m = rootState.memos.memos.filter( m => m.id === cur.memo_id)[0]
            let key = m.label

            if(!acc[key]) {
                acc[key] = [] 
            }
            acc[key].push(cur) 
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
