<template>
    <div class="profile">
        <header>
            <avatar size="100" :username="currentUser.name" inline="true"></avatar><br><br>
            <p class="name">{{currentUser.name}}</p>
        </header>
        <footer>
            <input class="search" type="text" placeholder="Suchen" @keyup="onKeyup">
        </footer>
    </div>
</template>
<script>
  import Avatar from 'vue-avatar'

  export default {
    components: {
      Avatar
    },
    computed: {
      currentUser () {
        return this.$store.state.user.currentUser
      }
    },
    methods: {
      onKeyup (e) {
        alert(e.target.value)
        this.$store.commit('chats/SEARCH_CHAT', e.target.value);
      }
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
</style>
