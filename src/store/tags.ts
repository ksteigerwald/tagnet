import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITagType, RootState, TagState, Tag } from '../types'
import { apolloClient } from '../constants/graphql'
import { tagsQry } from '../constants/tags.ql'

type TagGetter = GetterTree<TagState, RootState> 

export enum TagType {
  goal = "trophy",
  person = "user-alt",
  event = "calendar-alt",
  topic = "newspaper",
  idea = "lightbulb",
  any = "asterisk"
}

export const state: TagState = {
  tags: []
}

export const getters: GetterTree<TagState, RootState> = {

  tags: (stage, getters, rootState) => state.tags,

  filterTags: (state, getters, rootState, str) => (str: string) => {
    return state.tags.filter(tag => {
      return tag.label.match(new RegExp(str + ".*", "i"))
    })
  },

  findByCode: (state, getters, rootState, str) => (code: string) => {
    return state.tags.filter(tag => {
      return tag.code === code
    })
  },
}

export const mutations: MutationTree<TagState> = {
  addTag(state: TagState, newTag: Tag) {
    const tagCopy = Object.assign({}, newTag)
    state.tags.push(tagCopy)
  }
}

export const actions: ActionTree<TagState, RootState> = {
	async loadTags( { commit, dispatch, rootState}, id: number) {
		const response: any = await apolloClient.query({
			query: tagsQry
		})
		state.tags = response.data.tags
	}
}

export const tags:Module<TagState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
