import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { ITagType, RootState, TagState, Tag } from '../types'
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
  tags: (stage, getters, rootState) => state.tags,
  findTag: (state, getters, rootState, str) => (str: string) => {
    return state.tags.filter(tag => {
      console.log(tag.label === str, typeof str,str, ':', tag.label) 
      return tag.label.match(str, ".*")
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
