import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, MacroState, Macro} from '../types'
import { TagType } from './tags'

type MacroGetter = GetterTree<MacroState, RootState> 

export const state: MacroState = {
    macros: [
      { id: 1, format_id: 3, label: "Todo", desc: "Add todos to a bucket, get things done while being organized", code: "TODO"},
      { id: 2, format_id: 3, label: "Reminder", desc: "Set a reminder to get things done", code: "REMIND"},
      { id: 3, format_id: 3, label: "Nag", desc: "Go beyond a simple reminder, nag me till I get it done", code: "NAG"}
     ]
}

export const getters: GetterTree<MacroState, RootState> = {
  streams: (state, getters, rootState) => state.macros,
  filterMacros: (state, getters, rootState, str) => (str: string) => {
    return state.macros.filter(macro => {
      return macro.label.match(new RegExp(str + ".*", "i"))
    })
  },

}

export const macros:Module<MacroState, RootState> ={
  state,
  getters,
  ////mutations,
  //actions,
  namespaced: true
}