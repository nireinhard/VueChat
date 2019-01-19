/**
 * Created by niklasreinhard on 01.11.18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import chats from './modules/chats'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      chats,
      user
    }
})
