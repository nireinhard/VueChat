import {
  HTTP,
  ROUTES
} from '../api';
import Vue from "vue";

import jwtDecode from 'jwt-decode';

const state = {
  currentUser: {
    id: '',
    status: '',
    profileImage: '',
    name: '',
    token: null
  },
  userSearchResults: []
};

const getters = {
};

const actions = {
  UPDATE_STATUS({state, rootState, dispatch}, newStatus){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.user}/${state.currentUser.id}/status`;
      console.log(newStatus);
      HTTP.put(route, newStatus, { headers: { Authorization: rootState.user.currentUser.token } }).then((res) => {
        dispatch('LOAD_USER_STATUS');
        resolve(res);
      }).catch((err) => reject(err));
    })
  },
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
  LOAD_USER_STATUS ({state, rootState, commit}){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.user}/${state.currentUser.id}`;
      HTTP.get(route, { headers: { Authorization: rootState.user.currentUser.token } }).then((res) => {
        commit('SET_USER_STATUS', res.data.status);
      }).catch((err) => reject(err));
    });
  },
  LOGIN_USER({commit, dispatch}, {
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
        dispatch('LOAD_USER_STATUS');
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
  LOGOUT_USER(state){
    state.currentUser = {
      id: '',
      profileImage: '',
      name: '',
      status: '',
      token: null
    }
  },
  SET_USER_SEARCH_RESULTS(state, results){
    Vue.set(state, 'userSearchResults', [...results]);
  },
  SET_USER_STATUS(state, status){
    state.currentUser.status = status;
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
