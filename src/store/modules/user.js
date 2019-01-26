import {
  HTTP,
  ROUTES
} from '../api';

const state = {
  currentUser: {
    username: '',
    profileImage: '',
    name: '',
    token: null
  }
};

const getters = {

};

const actions = {
  LOGIN_USER(context, {username, password}) {
    let payload = {
      "username": username,
      "password": password
    };    
    return new Promise((resolve, reject) => {
      HTTP.post(ROUTES.signin, payload).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  REGISTER_USER(context, {username, password}) {
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
  SET_CURRENT_USER(){

  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}