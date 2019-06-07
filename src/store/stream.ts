import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, StreamState, Stream, Context, Event} from '../types'
import { TagType } from './tags'

type MemoGetter = GetterTree<StreamState, RootState> 

export const state: StreamState = {
    streams: [
      {context: Context.memo, event: Event.add },
      {context: Context.memo, event: Event.create },
      {context: Context.memo, event: Event.drop },
      {context: Context.memo, event: Event.error },
      {context: Context.toggle, event: Event.create },
      {context: Context.toggle, event: Event.append},
      {context: Context.line, event: Event.append},
      {context: Context.toggle, event: Event.search},
      {context: Context.open, event: Event.up },
      {context: Context.open, event: Event.down},
      {context: Context.open, event: Event.enter},
      {context: Context.open, event: Event.enter},
      {context: Context.toggle, event: Event.search},
      {context: Context.toggle, event: Event.create},
      {context: Context.toggle, event: Event.append}
     ]
}

export const getters: GetterTree<StreamState, RootState> = {
  streams: (state, getters, rootState) => state.streams,

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