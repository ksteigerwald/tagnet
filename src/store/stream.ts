import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, StreamState, Stream, Context, Event} from '../types'
import { TagType } from './tags'

type MemoGetter = GetterTree<StreamState, RootState> 

export const state: StreamState = {
    streams: [
        {context: Context.toggle, code:47, event: Event.create },
        {context: Context.create, code:47, event: Event.create },
        {context: Context.toggle, code:64, event: Event.append},
        {context: Context.append, code:64, event: Event.append},
        {context: Context.toggle, code:160, event: Event.search},
        {context: Context.open, code:1, event: Event.up },
        {context: Context.open, code:0, event: Event.down},
        {context: Context.open, code:10, event: Event.enter},
        {context: Context.open, code:32, event: Event.enter},
        {context: Context.toggle, code:160, event: Event.search},
        {context: Context.toggle, code:47, event: Event.create},
        {context: Context.toggle, code:64, event: Event.append}
     ]
}

export const getters: GetterTree<StreamState, RootState> = {
  streams: (state, getters, rootState) => state.streams,

  findByCode: (state, getters, rootState, id) => (code: number) => {
    return state.streams.filter(stream => {
      return stream.code === code
    })
  },

  findByContext: (state, getters, rootState, id) => (context: Context) => {
    return state.streams.filter(stream => {
      return stream.context === context
    })
  }
}

export const streams:Module<StreamState, RootState> ={
  state,
  getters,
  ////mutations,
  //actions,
  namespaced: true
}