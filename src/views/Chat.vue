<template>
    <div id="app">
        <div class="chats">
            <card></card>
            <list></list>
        </div>
        <div class="main" v-if="chatSelected">
            <info></info>
            <message></message>
            <textinput></textinput>
        </div>
    </div>
</template>
<script>
  import card from '../components/Card.vue'
  import list from '../components/List.vue'
  import message from '../components/Message.vue'
  import textinput from '../components/TextInput.vue'
  import info from '../components/Info.vue'
  import { ROUTES } from '../store/api';

  export default{
    components: {
      card,
      list,
      message,
      textinput,
      info,
    },
    computed: {
        chatSelected(){
            return this.$store.state.chats.selectedChat
        }
    },
    mounted() {
      console.log(this.$store.state.user.currentUser.token);
      this.$store.dispatch('chats/GET_CHATS');
      this.$sse(`${ROUTES.stream}&token=${this.$store.state.user.currentUser.token}`).then((msg) => console.log(msg));

      let es = new EventSource(`${ROUTES.stream}&token=${this.$store.state.user.currentUser.token}`);

      es.addEventListener('message', event => {
        let data = JSON.parse(event.data);
        console.log(data);
      }, false);

      es.addEventListener('error', event => {
        if (event.readyState == EventSource.CLOSED) {
          console.log('Event was closed');
          console.log(EventSource);
        }
      }, false);
    }
  }
</script>
<style lang="less" scoped>
    #app {
        width: 100%;
        height:100%;
        position: absolute;
        margin-left: -10px;
        margin-top: -10px;
        bottom:0px;
        right:0px;
        overflow: hidden;
        .chats, .main {
            height: 100%;
        }
        .chats {
            float: left;
            width: 200px;
            padding-top:50px;
            color: #f4f4f4;
            background-color: #2e3238;
            border-right: 2px solid #292d34;
        }
        .text {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
        }
        .message {
            height: ~'calc(100% - 160px)';
        }
        .main {
            height:100%;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>
