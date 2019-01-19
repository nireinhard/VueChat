<template>
  <div class="list">
    <ul>
      <li
        v-for="chat in chats"
        :key="chat.id"
        :class="{ active: chat.id === selectedChat }"
        @contextmenu.prevent="$refs.menu.open($event, { chatid: chat.id })"
        @click="selectChat(chat.id)"
      >
        <avatar
          :src="chat.user.profileImage"
          size="60"
          :username="chat.user.name"
          style="background-size:cover;"
        ></avatar>
        <p class="name">{{chat.user.name}}</p>
        <div class="unreadbadge" v-if="getUnreadCount(chat.id) > 0">{{getUnreadCount(chat.id)}}</div>
      </li>
    </ul>
     <vue-context ref="menu">
        <ul slot-scope="child">
            <li @click="rightClick($event.target.innerText, child.data)" style="color:black;">Blockieren</li>
            <li @click="rightClick($event.target.innerText, child.data)" style="color:black;">Löschen</li>
        </ul>
    </vue-context>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import { VueContext } from 'vue-context';

export default {
  components: {
    Avatar,
    VueContext
  },
  methods: {
    rightClick(text, data){
      alert(`You clicked ${data}!`);
    },
    selectChat(id) {
      this.$store.commit("chats/SET_SELECTED_CHAT", id);
    },
    getUnreadCount(id) {
      const chat = this.chats.find(chat => chat.id === id);
      const unread = chat.messages.filter(message => message.read === false);
      return unread.length;
    }
  },
  computed: {
    chats() {
      return this.$store.state.chats.chats;
    },
    selectedChat() {
      return this.$store.state.chats.selectedChat;
    }
  }
};
</script>
<style scoped lang="less">
.list {
  ul,
  li {
    text-align: left;
    list-style-type: none;
    list-style-position: inside;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .unreadbadge {
    background-color: red;
    position: relative;
    left: 140px;
    border-radius: 20px;
    width: 20px;
    height: 20px;
    text-align: center;
    top: -40px;
  }
  .avatar,
  .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    margin-top: -45px;
    margin-left: 80px;
  }
}
</style>