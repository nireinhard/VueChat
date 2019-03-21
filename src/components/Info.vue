<template>
  <div class="info" v-if="selectedChat">
    <div class="avatar">
      <avatar :username="getPartnerUsername()" :size=100></avatar>
      <div class="name">{{getPartnerUsername()}}</div>
      <div class="shortinfo">{{getPartnerStatus() || "Hey there I'm using VueChat"}}</div>
    </div>
      <button v-if="selectedChat.members.length > 2" class="btn btn-primary manage" @click="editMembers()">Verwalten</button>
  </div>
</template>
<script>
import Avatar from "vue-avatar";

export default {
  components: {
    Avatar
  },
  data() {
    return {};
  },
  computed: {
    selectedChat() {
      let chatId = this.$store.state.chats.selectedChat;
      return this.$store.state.chats.chats.find(chat => chat.id === chatId);
    },
    chatPartner(){
      return this.selectedChat.members.filter((member) => member.id !== this.$store.state.user.currentUser.id)[0];
    }
  },
  methods: {
    getPartnerUsername() {
      return this.selectedChat.members.length > 2 ? this.selectedChat.name : this.chatPartner.username;
    },
    getPartnerStatus(){
      return this.selectedChat.members.length > 2 ? " " : this.chatPartner.status;
    },
    editMembers(){
      this.$bus.$emit('editMembersEvent');
    }
  }
};
</script>
<style lang="less" scoped>
.info {
  right: 0px;
  position: absolute;
  top: 0px;
  left: 200px;
  background-color: #2e3238;
  color: #ffffff;
  text-align: left;

  .avatar {
    display: inline;
    top:10px;
    left: 20px;
    position: relative;
    margin-bottom: 10px;
  }

  .name {
    vertical-align: top;
    display: inline-block;
    font-size: 25px;
    margin-left: 120px;
    margin-top: -80px;
  }

  .shortinfo {
    vertical-align: top;
    position: absolute;
    left: 120px;
    width: 500px;
    margin-top: -60px;
  }
    .manage{
        position: absolute;
        right:20px;
        top:40px;
    }
}
</style>
