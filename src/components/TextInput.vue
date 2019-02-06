<template>
  <div v-if="selectedChat">
    <div class="textinput">
      <textarea id="newmessage" placeholder="Ctrl + Enter" v-model="content" @keyup="onKeyup"></textarea>
    </div>
    <picker
      v-if="showEmoji"
      include="[recent, people]"
      set="apple"
      showPreview="false"
      :style="{ position: 'absolute', bottom: '0', right: '0', top:'125', height:'100%' }"
      @select="addEmoji"
    />
  </div>
</template>
<script>
import { Picker } from "emoji-mart-vue";

export default {
  components: {
    Picker
  },
  data() {
    return {
      showEmoji: true,
      content: ""
    };
  },
  computed: {
    selectedChat() {
      return this.$store.state.chats.selectedChat;
    }
  },
  methods: {
    toggleEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    addEmoji(emoji) {
      this.content += emoji.native;
      this.$el.querySelector("#newmessage").focus();
    },
    onKeyup(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.$store.dispatch("chats/SEND_MESSAGE", this.content).then((res) => {
          this.$store.dispatch("chats/GET_CHAT_MESSAGES");
        });
        //this.$store.commit("chats/SEND_MESSAGE", this.content);
        this.content = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.textinput {
  height: 100px;
  border-top: solid 1px #ddd;
  position: absolute;
  left: 202px;
  bottom: 0px;
  right: 350px;
  display: inline-block;
}
textarea {
  padding: 10px;
  height: 100%;
  border: none;
  position: absolute;
  left:0px;
  right:100px;
  width:100%;
  outline: none;
  resize: none;
  font-size: 20px;
}
.textinput button {
  position: absolute;
  color: black;
  top: 10px;
  right: 5px;
}
</style>
