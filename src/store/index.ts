import Vue from 'vue';
import Vuex from 'vuex';
import { tags } from './tags'
import { memos } from './memos'
import { lines } from './lines'
import { user } from './user'
import { streams } from './stream'
import { macros } from './macros'

Vue.use(Vuex);

export default new Vuex.Store({
  //state: {},
  mutations: {},
  actions: {},
  modules: {
      macros,
      streams,
      tags,
      memos,
      lines,
      user
  }
});
