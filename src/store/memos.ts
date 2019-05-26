import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, MemoState, Memo } from '../types'
import { TagType } from './tags'
import { memosQry,memosQryMemoLines,memosSearch, memosInsert, memosGet, updateMemoCode } from '@/constants/memos.ql'
import { apolloClient } from '@/constants/graphql'
import Hashids from 'hashids'
let hashid = new Hashids('MEMO')

type MemoGetter = GetterTree<MemoState, RootState> 

export const state: MemoState = {
    memos: [ ],
}

export const mutations: MutationTree<MemoState> = {
    addMemo(state: MemoState, newMemo: Memo): void {
        const memoCopy = Object.assign({}, newMemo)
        console.log('memoCopy', memoCopy)
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
        dispatch('updateMemoCode', memo)

    },
    
    async updateMemoCode({ commit, dispatch, rootState }, memo:Memo) {

        let code = hashid.encode(memo.id)
        memo.code = code
        console.log(code, '<<hashid')
        const response: any = await apolloClient.mutate({
            mutation: updateMemoCode,
            variables: {
                    id: memo.id,
                    code: code
            }
        })

        commit('addMemo', memo)

    },

    async loadMemos( { commit, dispatch, rootState} ) {

        const response: any = await apolloClient.query({
            query: memosQry
        })
        state.memos = response.data.memos
    },

    async loadWall({ commit, dispatch, rootState} ) {
        const response: any = await apolloClient.query({
            query: memosQryMemoLines
        })

        state.memos = response.data.memos
    },

    async searchMemos({ commit, dispatch, rootState}, term: string ) {
        let vars: string = `%${term}%`
        const response: any = await apolloClient.query({
            query: memosSearch,
            variables: { input: vars }	
        })
        console.log('searchMemos', response.data.memos)
        state.memos = response.data.memos
    },

    async getMemo({ commit, dispatch, rootState}, id: number ) {
        const response: any = await apolloClient.query({
            query: memosGet,
            variables: { input: id }	
        })
        state.memos = response.data.memos
        console.log(id, state.memos)
    },
}

export const getters: GetterTree<MemoState, RootState> = {
    memos: (state, getters, rootState) => state.memos,

    findMemo: (state, getters, rootState, id) => (id: number) => {
        return state.memos.filter(memo => {
            return memo.id === id
        })
    },

    filterMemos: (state, getters, rootState, str) => (str: string) => {
        return state.memos.filter(memo => {
            return memo.label.match(new RegExp(str + ".*", "i"))
        })
    }
}

export const memos:Module<MemoState, RootState> ={
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
