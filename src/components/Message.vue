<template>
<div id="chatwindow">
    <div id="message">
        <ul>
            <li v-for="message in chatMessages" :key="message.id">
                <p class="time">
                    <!-- <span>{{ item.date | time }}</span> -->
                </p>
                <div class="main" :class="{ self: message.sender === currentUser.id }">
                    <!--<img class="avatar" width="30" height="30" :src="message.self ? currentUser.profileImage : currentChat.user.profileImage" />-->
                    <div class="text">{{ message.content }}</div>
                </div>
            </li>
            <div id="bottomchat"></div>
        </ul>
    </div>
</div>
</template>
<script>
  export default {
    mounted(){
      this.$store.dispatch('chats/GET_CHAT_MESSAGES');
    },
    computed: {
      currentUser () {
        return this.$store.state.user.currentUser;
      },
      chatMessages () {
        return this.$store.state.chats.selectedChatMessages;
      }
    },
    updated () {
        // scroll to bottom of message list
        document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight;
    }
  };
</script>
<style lang="less" scoped>
    #message {
        position: absolute;
        top:125px;
        bottom:200px;
        right:0px;
        left:202px;
        padding: 10px 15px;
        overflow-y: scroll;
        overflow-x: hidden;

        li {
            margin-bottom:-5px;
            margin-left:-30px;
            text-align: left;
            list-style-type: none;
            list-style-position:inside;
        }
        .time {
            margin: 7px 0;
            text-align: center;

            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
            }
        }
        .avatar {
            float: left;
            margin: 0 10px 0 0;
            border-radius: 3px;
        }
        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: ~'calc(100% - 40px)';
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
            }
            .text {
                background-color: #b2e281;

                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: #b2e281;
                }
            }
        }
    }
</style>
