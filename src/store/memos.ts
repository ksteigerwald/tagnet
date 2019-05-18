import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, MemoState, Memo } from '../types'
import { TagType } from './tags'
import { memosQry,memosQryMemoLines,memosSearch, memosInsert } from '@/constants/memos.ql'
import { apolloClient } from '@/constants/graphql'
const uuidv1 = require('uuid/v1');

type MemoGetter = GetterTree<MemoState, RootState> 

export const state: MemoState = {
    memos: [ ],
    wall: []
}

export const mutations: MutationTree<MemoState> = {
    addMemo(state: MemoState, newMemo: Memo): void {
        const memoCopy = Object.assign({}, newMemo)
        state.memos.push(memoCopy)
    }
}

export const actions: ActionTree<MemoState, RootState> = {
    async createMemo({ commit, dispatch, rootState }, payload:Memo) {
        const response: any = await apolloClient.mutate({
            mutation: memosInsert,
            variables: {
                objects: [{
                    label: payload.label,
                    tag_id: payload.tag_id
                }]
            }
        })

        let memo: Memo = response.data.insert_memos.returning.pop()
        commit('addMemo', memo)

    },

    async loadMemos( { commit, dispatch, rootState} ) {

        const response: any = await apolloClient.query({
            query: memosQry
        })
        state.memos = response.data.memos
    },


    async loadWall( { commit, dispatch, rootState} ) {

        const response: any = await apolloClient.query({
            query: memosQryMemoLines
        })
        state.wall = response.data.memos
    },

    async searchMemos( { commit, dispatch, rootState}, term: string ) {
        let vars: string = `%${term}%`
        const response: any = await apolloClient.query({
            query: memosSearch,
            variables: { input: vars }	
        })

        state.wall = response.data.memos
    }
}

export const getters: GetterTree<MemoState, RootState> = {
    memos: (state, getters, rootState) => state.memos,
    find: (state, getters, rootState, id) => 
        state.memos.filter(memo => memo.id === id),
    memoLines: (state, getters, rootState ) => state.wall
}

export const memos:Module<MemoState, RootState> ={
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
