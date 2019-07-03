import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, MemoState, Memo } from '../types'
import { TagType } from './tags'
import { deleteMemo, memosQry,memosQryMemoLines,memosSearch, memosInsert, memosGet, updateMemoCode } from '@/constants/memos.ql'
import { apolloClient } from '@/constants/graphql'
import Hashids from 'hashids'
let hashid = new Hashids('MEMO')

type MemoGetter = GetterTree<MemoState, RootState> 

export const state: MemoState = {
    memos: [ ],
}

export const mutations: MutationTree<MemoState> = {

    addMemo(state: MemoState, newMemo: Memo): void {
        const memoCopy = Object.assign({MemoLines:[]}, newMemo)
        state.memos.push(memoCopy)
    },

    commitState(state: MemoState, memos: Memo[]): void {
        state.memos = memos
    },

    removeMemo(state: MemoState, memo: Memo): void {
        let memos = state.memos.filter(mem => mem.id !== memo.id)
        state.memos = memos
    }
}

export const actions: ActionTree<MemoState, RootState> = {
    async createMemo({ commit, dispatch, rootState }, payload:Memo) {

        const response: any = await apolloClient.mutate({
            mutation: memosInsert,
            variables: {
                objects: [{
                    label: payload.label,
                    tag_id: payload.tag_id,
                    autogen: payload.autogen || false
                }]
            }
        })

        let memo: Memo = response.data.insert_memos.returning.pop()
        await dispatch('updateMemoCode', memo)
        await commit('addMemo', memo)
        await dispatch('facts/createFact', { memo_id: memo.id }, { root: true })
    },
    
    async updateMemoCode({ commit, dispatch, rootState }, memo:Memo) {

        let code = hashid.encode(memo.id)
        memo.code = code
        const response: any = await apolloClient.mutate({
            mutation: updateMemoCode,
            variables: {
                id: memo.id,
                code: code
            }
        })

    },

    async deleteMemo({ commit, dispatch, rootState }, memo:Memo) {
        const response: any = await apolloClient.mutate({
            mutation: deleteMemo,
            variables: {
                    id: memo.id,
            }
        })
        commit('removeMemo', memo)
    },

    async loadMemos( { commit, dispatch, rootState} ) {
        const response: any = await apolloClient.query({
            query: memosQry
        })

        state.memos = response.data.memos
        return state.memos
    },

    async loadWall({ commit, dispatch, rootState} ) {
        const response: any = await apolloClient.query({
            query: memosQryMemoLines
        })

        commit('commitState', response.data.memos)
        return state.memos
    },

    async searchMemos({ commit, dispatch, rootState}, term: string ) {
        let vars: string = `%${term}%`
        const response: any = await apolloClient.query({
            query: memosSearch,
            variables: { input: vars }	
        })
        console.log('searchMemos', response.data.memos)
        state.memos = response.data.memos

        await dispatch('facts/createFact', { search: term }, { root: true })
    },

    //Find a memo with given code
    //When no code is found, find image any bucket
    //when no [image ANY] bucket, create image [ANY] bucket memo 
    //Create line item with image any path

}
function _d(date: string): number {
    return new Date(date).getTime()
}
export const getters: GetterTree<MemoState, RootState> = {
    memos: (state, getters, rootState) => state.memos.sort((a,b) => _d(b.created)  - _d(a.created)),

    findMemo: (state, getters, rootState, id) => (id: number) => {
       return state.memos.filter(memo => {
            return memo.id === id
        })
    },

    findByCode: (state, getters, rootState, str) => (code: string) => {
        return state.memos.filter(tag => {
            return tag.code === code
        })
    },

    filterMemos: (state, getters, rootState, str) => (str: string) => {
        return state.memos.filter(memo => {
            return memo.label.match(new RegExp(str + ".*", "i"))
        })
    },

    findImgAny: (state, dispatch, rootState): Memo[] => 
        state.memos.filter(memo => memo.tag_id === 7 && memo.autogen === true)

}

export const memos:Module<MemoState, RootState> ={
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
