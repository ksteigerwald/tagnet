import Vue from 'vue';
import Vuex from 'vuex';
import { tags } from './tags'
import { memos } from './memos'
import { lines } from './lines'
import { user } from './user'
import { streams } from './stream'
import { macros } from './macros'
import { facts } from './facts'

Vue.use(Vuex);

export default new Vuex.Store({
  //state: {},
  mutations: {},
  actions: {},
  modules: {
      facts,
      macros,
      streams,
      tags,
      memos,
      lines,
      user
  }
});
