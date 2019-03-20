<template>
    <div id="app">
        <div class="chats">
            <card></card>
            <list></list>
            <b-button @click="logout()" class="bottom">
                Abmelden
            </b-button>
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
    data () {
      return {
        receiveMessages: null,
        receiveChats: null
      }
    },
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
    methods: {
      logout(){
        this.$store.commit('users/LOGOUT_USER');
        this.$cookies.remove("token");
        this.$router.push({name: "home"});
      },
      receiveNewMessages(){
        const token = this.$store.state.user.currentUser.token;
        const route = `${process.env.VUE_APP_BACKEND_URL}/${ROUTES.stream_messages}?token=${token}`;

        this.$sse(route).then((sse) => {
          this.receiveMessages = sse;
          sse.subscribe('', data => {
            this.$store.dispatch('chats/GET_CHAT_MESSAGES');
            this.$store.commit('chats/SET_UNSET_COUNT', JSON.parse(data));
          });
          sse.onError(e => {

          })
        }).catch(err => {

        });
      },
      receiveNewChats(){
        const token = this.$store.state.user.currentUser.token;
        const route = `${process.env.VUE_APP_BACKEND_URL}/${ROUTES.stream_chats}?token=${token}`;

        this.$sse(route).then((sse) => {
          this.receiveChats = sse;
          sse.subscribe('', data => {
            console.log(data);
            this.$store.dispatch('chats/GET_CHATS');
          });
          sse.onError(e => {
            this.$notify("Fehler beim Empfangen neuer Nachrichten: " + e.message);
          })
        }).catch(err => {
          this.$notify("Fehler beim Einrichten der SSE Verbindung: " + err);
        });
      }
    },
    mounted() {
      this.$store.dispatch('chats/GET_CHATS');
      this.receiveNewMessages();
      this.receiveNewChats();

    },
    beforeDestroy(){
      if (this.receiveMessages) this.receiveMessages.close();
      if (this.receiveChats) this.receiveChats.close();
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
    .bottom{
        position:absolute;
        bottom:30px;
        left:50px;
    }
</style>
