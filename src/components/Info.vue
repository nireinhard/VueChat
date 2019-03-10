<template>
  <div class="info" v-if="selectedChat">
    <div class="avatar">
      <avatar :username="getPartnerUsername()" :size=100></avatar>
      <div class="name">{{getPartnerUsername()}}</div>
      <!--<div class="shortinfo">Zuletzt online 12:42</div>-->
    </div>
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
      return this.$store.state.chats.selectedChat;
    }
  },
  methods: {
    getPartnerUsername() {
      const id = this.selectedChat;
      const chat = this.$store.state.chats.chats.find(chat => chat.id === id);
      const partner = chat.members.filter((member) => member.id !== this.$store.state.user.currentUser.id)[0];
      return chat.members.length > 2 ? chat.name : partner.username;
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
    width: 100%;
    margin-top: -60px;
  }
}
</style>
