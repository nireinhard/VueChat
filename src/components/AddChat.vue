<template>
    <div>
        <hr/>
        <b-button @click="showModal">
            Neuer Chat
        </b-button>
        <hr/>
        <b-modal ref="newChatModal" hide-footer size="lg">
            <b-form @submit="createChat" @keydown.enter.prevent="searchUsers">
                <div v-if="selected.length > 1">
                    <b-form-input v-model="groupChatName"
                                  type="text"
                                  placeholder="Name des Gruppenchats eingeben"
                                  required
                    ></b-form-input>
                    <hr/>
                </div>
                <b-container class="container">
                    <b-row>
                        <b-col cols="8">
                            <b-form-input v-model="searchString"
                                          type="text"
                                          placeholder="Suchen nach Benutzername..."
                                          @change="searchUsers"
                            ></b-form-input>
                            <hr/>
                            <ul>
                                <li v-for="result in results" :key="result.id">
                                    <div>
                                        <b-container class="container">
                                            {{result.username}}
                                            <b-btn v-if="!selected.includes(result)" class="mt-3" variant="success" @click="addToSelected(result)">
                                                Hinzufügen
                                            </b-btn>
                                        </b-container>
                                    </div>
                                    <hr>
                                </li>
                            </ul>
                        </b-col>
                        <b-col cols="4">
                            <strong>Ausgewählt</strong>
                            <ul>
                                <li v-for="(select, index) in selected" :key="select.id">
                                    {{select.username}}
                                    <b-btn class="mt-3" variant="danger" @click="removeFromSelected(index)">
                                        Entfernen
                                    </b-btn>
                                </li>
                            </ul>
                        </b-col>
                    </b-row>
                </b-container>
                <b-btn v-if="selected.length >= 1" type="submit" class="mt-3" variant="primary" style="width:100%;">
                    Erstellen
                </b-btn>
                <b-btn v-else class="mt-3" variant="primary" block @click="hideModal">
                    Schließen
                </b-btn>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        groupChatName: '',
        searchString: '',
        selected: [],
      }
    },
    computed: {
      results(){
        let results = this.$store.state.user.userSearchResults;
        let currentUserId = this.$store.state.user.currentUser.id;
        return this.searchString ? results.filter(user => user.id !== currentUserId) : []
      }
    },
    methods: {
      searchUsers(){
        this.$store.dispatch('user/SEARCH_USER', {username: this.searchString});
      },
      createChat(evt){
        evt.preventDefault();
        const data = {
          isGroup: this.selected.length > 1,
          name: (this.selected.length > 1) ? this.groupChatName : this.selected[0].username,
          members: this.selected
        };
        this.$store.dispatch('chats/CREATE_CHAT', data).then((res) => {
          this.$store.dispatch('chats/GET_CHATS');
          this.hideModal();
        });
      },
      addToSelected(user){
        this.selected.push(user);
      },
      removeFromSelected(index){
        this.selected.splice(index, 1);
      },
      showModal() {
        this.$refs.newChatModal.show()
      },
      hideModal() {
        this.resetData();
        this.$refs.newChatModal.hide()
      },
      resetData(){
        this.selected = [];
        this.searchString = '';
        this.groupChatName = '';
      }
    }
  }
</script>

<style scoped>
    ul {
        margin-left: -40px;
        list-style-type: none;
    }
    .container {
        text-align: left;
    }

    .d-block * {
        color: #000000;
    }
</style>
