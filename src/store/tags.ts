import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, TagState, Tag } from '../types'

type TagGetter = GetterTree<TagState, RootState> 
export enum TagType {
	Goal = "trophy",
	Person = "user-alt",
	Event = "calendar-alt",
	Any = "asterisk"	
}

export const state: TagState = {
    tags: [
        { code: 'GOL', label: 'Goal' },
        { code: 'PER', label: 'Person' },
        { code: 'EVT', label: 'Event' },
        { code: 'ANY', label: 'Any' }
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
