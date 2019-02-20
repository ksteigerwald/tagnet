import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, MemoState, Memo } from '../types'
import { TagType } from './tags'

type MemoGetter = GetterTree<MemoState, RootState> 

export const state: MemoState = {
    memos: [
        { id: 'chFRfjc7B9pqfoJBJu8Lg', label: 'Practice guitar every day for a month', tag: 'goal', type: TagType.Goal },
        { id: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Improve learning on AWS environment', tag: 'goal', type: TagType.Goal },
        { id: '7u2ARq72CAUkEZGcaqZWDz', label: 'Read a book a week', tag: 'goal', type: TagType.Goal },
        { id: 'deCKZwZtJmGLtWQg6eoxY1', label: '@jdoe', tag: 'follow', type: TagType.Person  },
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
