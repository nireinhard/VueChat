import {
  HTTP,
  ROUTES
} from '../api';
import Vue from "vue";

import jwtDecode from 'jwt-decode';

const state = {
  currentUser: {
    id: '',
    profileImage: '',
    name: '',
    token: null
  },
  userSearchResults: []
};

const getters = {

};

const actions = {
  SEARCH_USER({commit, rootState}, username){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.user}?username=${username.username}`;
      HTTP.get(route, { headers: { Authorization: rootState.user.currentUser.token } }).then((res) => {
        commit('SET_USER_SEARCH_RESULTS', res.data);
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  CHECK_COOKIE({commit}){

  },
  LOGIN_USER({commit}, {
    username,
    password
  }) {
    let payload = {
      "username": username,
      "password": password
    };
    return new Promise((resolve, reject) => {
      HTTP.post(ROUTES.signin, payload).then((res) => {
        const token = res.headers.authorization;
        commit('SET_USER', token);
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  REGISTER_USER(context, {
    username,
    password
  }) {
    let payload = {
      "username": username,
      "password": password
    };
    return new Promise((resolve, reject) => {
      HTTP.post(ROUTES.signup, payload).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
};

const mutations = {
  SET_USER_SEARCH_RESULTS(state, results){
    Vue.set(state, 'userSearchResults', [...results]);
  },
  SET_USER(state, token){
    const decoded = jwtDecode(token);
    state.currentUser.name = decoded.name;
    state.currentUser.id = decoded.sub;
    state.currentUser.token = token;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
