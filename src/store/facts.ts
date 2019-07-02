import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import {  RootState, FactState, Fact } from '../types'
import { apolloClient } from '../constants/graphql'
import { factsQry, factsInsert } from '../constants/facts.ql'

type FactGetter = GetterTree<FactState, RootState> 


export const state: FactState = {
  facts: []
}

export const getters: GetterTree<FactState, RootState> = {
  facts: (state, getters, rootState) => state.facts,
}

export const mutations: MutationTree<FactState> = {
  addFact(state: FactState, newFact: Fact) {
    const FactCopy = Object.assign({}, newFact)
    state.facts.push(FactCopy)
  },

}

export const actions: ActionTree<FactState, RootState> = {
	async loadFacts( { commit, dispatch, rootState}, id: number) {
		const response: any = await apolloClient.query({
			query: factsQry
		})
		state.facts = response.data.facts
  },

  async createFact({ commit, dispatch, rootState }, payload: any ) {

        const response: any = await apolloClient.mutate({
            mutation: factsInsert,
            variables: {
                objects: [{
                    memo_id: payload.memo_id || null,
                    line_id: payload.line_id || null,
                    search: payload.search || null
                }]
            }
        })

        let fact: Fact = response.data.insert_facts.returning.pop()
        await commit('loadFacts')
        
    },

}

export const facts:Module<FactState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
