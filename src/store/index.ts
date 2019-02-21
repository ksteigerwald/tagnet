import Vue from 'vue';
import Vuex from 'vuex';
import { tags } from './tags'
import { memos } from './memos'
import { lines } from './lines'

Vue.use(Vuex);

export default new Vuex.Store({
  //state: {},
  mutations: {

  },
  actions: {

  },
  modules: {
      tags,
      memos,
      lines
  }
});
