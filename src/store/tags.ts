import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, TagState, Tag } from '../types'
import { apolloClient } from '../constants/graphql'
import { tagsQry } from '../constants/tags.ql'

type TagGetter = GetterTree<TagState, RootState> 
export enum TagType {
  Goal = "trophy",
  Person = "user-alt",
  Event = "calendar-alt",
  Topic = "newspaper",
  Idea = "lightbulb",
  Any = "asterisk"
}

export const state: TagState = {
  tags: []
}

export const getters: GetterTree<TagState, RootState> = {
  tags: (stage, getters, rootState) => state.tags
}

export const mutations: MutationTree<TagState> = {
  addTag(state: TagState, newTag: Tag) {
    const tagCopy = Object.assign({}, newTag)
    state.tags.push(tagCopy)
  }
}

export const actions: ActionTree<TagState, RootState> = {
  async loadTags( { commit, dispatch, rootState}, id: number) {
    try {
        const response: any = await apolloClient.query({
            query: tagsQry
        })
        state.tags = response.data.tags
    }
    catch (err) {
        if(err.networkError.response.status === 400) {
            dispatch('user/logout', {}, {root: true})
        }
    }

  }
}

export const tags:Module<TagState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
