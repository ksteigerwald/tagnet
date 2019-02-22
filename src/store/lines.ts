import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, LineState, Line } from '../types'

type LineGetter = GetterTree<LineState, RootState> 

export const state: LineState = {
    lines: [
        { memoId: 'chFRfjc7B9pqfoJBJu8Lg', label: '1 hour of practice', logged: '2019-02-18T03:38:39.760Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 2 of Linux Academy', logged: '2019-02-18T03:43:12.337Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 3 of Linux Academy', logged: '2019-02-18T03:44:23.063Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 4 of Linux Academy', logged: '2019-02-20T03:44:23.063Z' },
    ]
}

export const mutations: MutationTree<LineState> = {
    addLine(state: LineState, newLine: Line): void {
        const lineCopy = Object.assign({}, newLine) 
        state.lines.push(lineCopy)
    }
}

export const actions: ActionTree<LineState, RootState> = {}

export const getters: GetterTree<LineState, RootState> = {
    lines: (state, getters, rootState) => state.lines,
    sortedLines: (state, getters, rootState) => state.lines
        .sort((a, b) => {
            return new Date(b.logged) - new Date(a.logged) 
        })
        .reduce((acc: any, cur: any) => {
            let m = rootState.memos.memos.filter( m => m.id === cur.memoId)[0]
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
