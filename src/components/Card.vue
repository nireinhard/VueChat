<template>
    <div>
        <div class="profile">
            <header>
                <avatar :size=100 :username="currentUser.name" :inline=true></avatar><br><br>
                <p class="name" @click="showModal">{{currentUser.name}}</p>
            </header>
            <footer>
                <input class="search" type="text" placeholder="Suchen" @keyup="onKeyup">
            </footer>
        </div>

        <b-modal ref="statusModal" hide-footer size="lg">
            <strong class="text">Status ändern</strong>
            <hr/>
            <b-form-input v-model="status"
                          type="text"
                          :placeholder="currentUser.status"
                          id="status"
            ></b-form-input>
            <hr/>
            <button @click="updateStatus()" class="btn btn-lg btn-primary btn-block">Speichern</button>
        </b-modal>
    </div>
</template>
<script>
  import Avatar from 'vue-avatar'

  export default {
    components: {
      Avatar
    },
    data () {
      return {
        status: ''
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.user.currentUser
      }
    },
    methods: {
      updateStatus () {
        this.$store.dispatch('user/UPDATE_STATUS', {status: this.status}).then((res) => {
          this.hideModal();
          this.$bus.$emit("flashmessage","success","Status erfolgreich geändert");
        });
      },
      onKeyup (e) {
        this.$store.commit('chats/SEARCH_CHAT', e.target.value);
      },
      showModal() {
        this.$refs.statusModal.show()
      },
      hideModal() {
        this.$refs.statusModal.hide()
      },
    }
  }
</script>
<style scoped lang="less">
    .center {
        background-color: red;
    }
    .profile {
        padding: 12px;
        border-bottom: solid 1px #24272C;

        footer {
            margin-top: 10px;
        }

        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .name {
            display: inline-block;
            font-size: 16px;
        }
        .search {
            padding: 0 10px;
            width: 80%;
            font-size: 12px;
            color: #fff;
            height: 30px;
            line-height: 30px;
            border: solid 1px #3a3a3a;
            border-radius: 4px;
            outline: none;
            background-color: #26292E;
        }
    }
    .text{
        color:#000;
    }
</style>
