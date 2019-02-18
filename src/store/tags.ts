import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, TagState, Tag } from '../types'

type TagGetter = GetterTree<TagState, RootState> 

export const state: TagState = {
    tags: [
        { type: 'Goal' },
        { type: 'Person' }
    ]
}

export const getters: GetterTree<TagState, RootState> = {
    tags: (stage, getters, rootState) => state.tags
}

export const tags:Module<TagState, RootState> = {
    state,
    getters,
    namespaced: true
}
