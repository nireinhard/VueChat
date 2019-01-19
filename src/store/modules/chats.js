/**
 * Created by niklasreinhard on 01.11.18.
 */
const state = {
  chats: [
    {
      id: 1,
      user: {
        name: 'Max',
        profileImage: 'https://www.digital-commerce-day.de/wp-content/uploads/2018/10/michel-philipp-maruhn-profilfoto.jpg'
      },
      messages: [
        {
          from: 'Max',
          message: 'Hi :)',
          timestamp: null,
          read: false
        },
        {
          from: 'Max',
          message: 'Was geht :)',
          timestamp: null,
          read: false
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Lisa',
        profileImage: 'http://www.sensibelreisen.de/wp-content/uploads/2018/01/Profilfoto-Ronja-Menzel.jpg'
      },
      unread: 1,
      messages: [
        {
          from: 'Lisa',
          message: 'Na du :)',
          timestamp: null,
          read: false
        }
      ]
    }
  ],
  selectedChat: null
};

const getters = {
  getCurrentChat: (state) => {
    return state.chats.find(chat => chat.id == state.selectedChat)
  }
};

const actions = {

};

const mutations = {
  SEARCH_CHAT (state, searchterm) {
    let filtered = state.chats.filter(chat => chat.user.name === searchterm);
    state.chats = filtered;
  },
  SET_SELECTED_CHAT (state, id) {
    state.selectedChat = id;
    const chat = state.chats.find(chat => chat.id === id);
    chat.messages.forEach(message => message.read = true)
  },
  SEND_MESSAGE (state, message) {
    const chat = state.chats.find(chat => chat.id === state.selectedChat);
    chat.messages.push({
      from: 'Lisa',
      message: message,
      self: true
    });
  }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
