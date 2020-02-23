import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, UserState, User } from '../types'
import * as config from '../helpers/config';
import { apolloClient } from '../constants/graphql'
import { usersQury, userNew} from '@/constants/users.ql'

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
    async authOProfileBuild({ commit, dispatch, rootState}, jwt: any) { 

      //console.log('auth', jwt.given_name)
      let name:string = jwt.given_name || jwt.nickname || null

      const response: any = await apolloClient.mutate({
        mutation: userNew,
        variables: { fname: name }
      })

      state.profile = response.data.insert_users.returning.pop()
      dispatch('memos/onboard', null, { root: true })

    },

    async authOProfileCheck({ commit, dispatch, rootState}, jwt: any) {

        const response: any = await apolloClient.query({
            query: usersQury
        })

        if(response.data.users.length > 0) {
          state.profile = response.data.users.pop()
        }
        else {
          dispatch('authOProfileBuild', jwt)
        }
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
