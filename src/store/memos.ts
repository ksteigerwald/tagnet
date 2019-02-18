import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, MemoState, Memo } from '../types'

type MemoGetter = GetterTree<MemoState, RootState> 

export const state: MemoState = {
    memos: [
        { id: 'chFRfjc7B9pqfoJBJu8Lg', text: 'Practice guitar every day for a month', tag: 'goal' },
        { id: 'bRnGK3kkh5ZEW2fe5VRssf', text: 'Improve learning on AWS environment', tag: 'goal' },
        { id: '7u2ARq72CAUkEZGcaqZWDz', text: 'Read a book a week', tag: 'goal' },
        { id: 'deCKZwZtJmGLtWQg6eoxY1', text: '@jdoe', tag: 'follow' },
    ]
}

export const mutations: MutationTree<MemoState> = {
    addMemo(state: MemoState, newMemo: Memo): void {
        console.log(state, newMemo)
        const memoCopy = Object.assign({}, newMemo) 
        state.memos.push(memoCopy)
    }
}

export const actions: ActionTree<MemoState, RootState> = {}

export const getters: GetterTree<MemoState, RootState> = {
    memos: (state, getters, rootState) => state.memos
}

export const memos:Module<MemoState, RootState> ={
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
