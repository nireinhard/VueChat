import {
  HTTP,
  ROUTES
} from '../api';
import Vue from "vue";

const state = {
  chats: [],
  filteredChats: [],
  selectedChat: null,
  selectedChatMessages: [],
  unread: []
};

const getters = {
  getCurrentChat: (state) => {
    return state.chats.find(chat => chat.id == state.selectedChat)
  }
};

const actions = {
  UPDATE_MEMBERS({state, rootState}, data){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.chats}/${state.selectedChat}/members`;
      HTTP.post(route, data, {
        headers: {
          'Authorization': rootState.user.currentUser.token
        }
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    });
  },
  DELETE_CHAT({rootState}, id){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.chats}/${id}`;
      HTTP.delete(route, {
        headers: {
          'Authorization': rootState.user.currentUser.token
        }
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  GET_CHAT_MESSAGES({rootState, state, commit}){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.chats}/${state.selectedChat}/messages`;
      HTTP.get(route, {
        headers: {
          'Authorization': rootState.user.currentUser.token
        }
      }).then((res) => {
        commit('SET_CHAT_MESSAGES', res.data);
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    });
  },
  GET_CHATS({rootState, commit}){
    return new Promise((resolve, reject) => {
      const route = `${ROUTES.chats}?uid=${rootState.user.currentUser.id}`;
      HTTP.get(route, {
        headers: {
          'Authorization': rootState.user.currentUser.token
        }
      }).then((res) => {
        commit('SET_CHATS', res.data);
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  CREATE_CHAT(context, data){
    return new Promise((resolve, reject) => {
      HTTP.post(ROUTES.chats, data, {
        headers: {
          'Authorization': context.rootState.user.currentUser.token
        }
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    });
  },
  SET_SELECTED_CHAT ({state, dispatch}, id) {
    state.selectedChat = id;
    state.selectedChatMessages = [];
    const unread = state.unread.filter(x => x.id===id);
    if (unread.length > 0){
      unread[0].count = 0;
    }
    dispatch('GET_CHAT_MESSAGES');
  },
  SEND_MESSAGE({state, rootState}, content){
    const route = `${ROUTES.chats}/${state.selectedChat}/messages`;
    const message = {
      sender: {
        id: rootState.user.currentUser.id
      },
      content: content
    };
    return new Promise((resolve, reject) => {
      HTTP.post(route, message, {
        headers: {
          'Authorization': rootState.user.currentUser.token
        }
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    });
  }
};

const mutations = {
  SET_UNSET_COUNT(state, payload){
    if (state.selectedChat && state.selectedChat === payload.chat){
      return;
    }
    const unread = state.unread.filter(x => x.id === payload.chat)[0];
    if(unread){
      unread.count += 1;
    }else{
      state.unread.push({id: payload.chat, count: 1});
    }
  },
  SET_CHAT_MESSAGES(state, messages){
    Vue.set(state, 'selectedChatMessages', [...messages]);
  },
  SET_CHATS (state, chats){
    Vue.set(state, 'chats', [...chats]);
  },
  SEARCH_CHAT (state, searchterm) {
    if (searchterm.length === 0) {
      state.filteredChats.splice(0, state.filteredChats.length)
    }else{
      let filtered = state.chats.filter(chat => chat.name.includes(searchterm));
      Vue.set(state, 'filteredChats', [...filtered]);
    }
  }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
