import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, UserState, User } from '../types'
import * as config from '../helpers/config';
import { apolloClient } from '../constants/graphql'
import { usersQury, userNew, setOnboarded} from '@/constants/users.ql'

import router from '../router'


type UserGetter = GetterTree<UserState, RootState> 

export const state: UserState =  {
  status: { loggedIn: false, loggingIn: false }, 
  user: null, 
  profile: null 
}

  export const getters: GetterTree<UserState, RootState> = {
    status: (stage, getters, rootState) => state.status.loggingIn,
    loggedIn: (stage, getters, rootState) => state.status.loggingIn,
    user: (stage, getters, rootState) => state.user
 }

  export const mutations: MutationTree<UserState> = {
    setUser(state: UserState, payload: any) {
      if(!payload) return

      state.status.loggedIn = true
      state.user = {
        token: payload.signInUserSession.idToken.jwtToken,
        username: payload.username,
        email: payload.attributes.email
      }
    },

    loginFailure(state: UserState, user: User) { 
      state.status = {}
      state.user = null;
    },

    loginSuccess(state: UserState, user: User) { 
      state.status = { loggedIn: true }
      state.user = user;
    },

    loginRequest(state: UserState, user: User) { 
      state.status = { loggingIn: true }
      state.user = user;
    }
  }

  export const actions: ActionTree<UserState, RootState> = {

    async authOProfileCheck({ commit, dispatch, rootState}) {


      apolloClient.query({ query: usersQury })
          .then((r:any) => {
            console.log(r)
            if(!r.data.users[0].is_onboard) {
              dispatch('memos/onboard', null, { root: true })
            }
      })
        if(true) {
          //state.profile = response.data.users.pop()
        }
        else {
        }
    },

    async logUserOnboarded({ commit, dispatch, rootState}) {
      console.log('logUserOnboarded')
      await apolloClient.mutate({ mutation: setOnboarded })
          .then((r:any) => {
            state.user.is_onboarded = true
          })
    },

    async logUser({ commit, dispatch, rootState}, payload: any ) {
      commit('setUser', payload)
      dispatch('authOProfileCheck')
    }
    
  }

  export const user:Module<UserState, RootState> = {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
  }

  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);

      if (!response.ok) { 
        if (response.status === 401) { 
          //logout
          location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }
