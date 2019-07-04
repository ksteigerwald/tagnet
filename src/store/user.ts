import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, UserState, User } from '../types'
import * as config from '../helpers/config';
import { apolloClient } from '../constants/graphql'
import { usersQury, userNew} from '@/constants/users.ql'

import router from '../router'


type UserGetter = GetterTree<UserState, RootState> 

let jsonKey: any = localStorage.getItem(config.localKey('user')) || ''
const localUser: User = (jsonKey) ? jsonKey : null;

export const state: UserState = localUser
  ? { status: { loggedIn: true }, user: localUser, profile: null }
  : { status: {}, user: null, profile: null };

  export const getters: GetterTree<UserState, RootState> = {
    status: (stage, getters, rootState) => state.status.loggingIn
 }

  export const mutations: MutationTree<UserState> = {
    setUser(state: UserState, user: User) {
      localStorage.setItem(config.localKey('user'), JSON.stringify(user));
    },

    logout(state: UserState, user: User) {
      localStorage.removeItem(config.localKey('user'));
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
    async login( { commit, dispatch, rootState  }, payload: any) { 
      let username: string = payload.username
      let password: string = payload.password

      const requestOptions:any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };

      let url:string = `${config.apiUrl}/users/authenticate`
      //var resp: any = await fetch(url, requestOptions)
      fetch(url, requestOptions)
      .then(handleResponse)
      .then((data) => {
        let user: User =  data
        commit('loginSuccess', user)
        commit('setUser', user)
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        commit('loginFailure')
        commit('logout')
        //dispatch('alert/error', error, { root: true });
      })
    },

    logout({ commit }) {
      commit('logout');
    },

    async authOProfileBuild({ commit, dispatch, rootState}, jwt: any) { 

      console.log('auth', jwt.given_name)

      const response: any = await apolloClient.mutate({
        mutation: userNew,
        variables: { fname: jwt.given_name }
      })

      state.profile = response.data.insert_users.returning.pop()
      dispatch('memos/onboard', null, { root: true })

    },
    async authOProfileCheck({ commit, dispatch, rootState}, jwt: any) {
      console.log('JWT', jwt)

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
