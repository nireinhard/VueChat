<template>
    <div class="login-wrapper border border-light">
        <form class="form-signin" @submit.prevent="sendForm">
            <h2 class="form-signin-heading" v-if="loginMode">Einloggen</h2>
            <h2 class="form-signin-heading" v-else>Registrieren</h2>

            <label for="inputEmail" class="sr-only">E-Mail Addresse</label>
            <input
                    v-model="username"
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Benutzername"
                    required
                    autofocus
            >

            <label for="inputPassword" class="sr-only">Passwort</label>
            <input
                    v-model="password"
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Passwort"
                    required
            >

            <div v-if="!loginMode">
                <label for="inputPasswordRetype" class="sr-only">Passwort wiederholen</label>
                <input
                        v-model="passwordRetype"
                        type="password"
                        id="inputPasswordRetype"
                        class="form-control"
                        placeholder="Passwort wiederholen"
                        required
                >
            </div>

            <br>
            <button class="btn btn-lg btn-primary btn-block" type="submit" v-if="loginMode">Einloggen</button>
            <button class="btn btn-lg btn-primary btn-block" type="submit" v-else>Registrieren</button>
            <br>
            <label @click="toggleMode()" v-if="loginMode">Registrieren</label>
            <label @click="toggleMode()" v-else>Zurück zum Login</label>
            <hr/>
            Build: {{buildVersion}}
        </form>
    </div>
</template>

<script>
  export default {
    name: "Login",
    beforeMount(){
      console.log(process.env);
    },
    data() {
      return {
        buildVersion: process.env.VUE_APP_BUILD || '',
        loadingScreen: null,
        loginMode: true,
        username: "",
        password: "",
        passwordRetype: "",
      };
    },
    methods: {
      showDialog(mode, message) {
        this.$notify({
          group: "all",
          type: mode,
          text: message
        });
      },
      showLoading() {
        this.loadingScreen = this.$loading.show({
          canCancel: false,
          onCancel: null
        });
      },
      toggleMode() {
        this.loginMode = !this.loginMode;
      },
      sendForm() {
        this.loginMode
          ? this.login()
          : this.register()
      },
      login() {
        this.showLoading();
        this.$store
          .dispatch("user/LOGIN_USER", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            const token = res.headers.authorization;
            this.showDialog("success", "Erfolgreich angemeldet");
            this.loadingScreen.hide();
            this.$router.push({name: "chat"});
          })
          .catch(err => {
            // show error
            this.loadingScreen.hide();
            this.showDialog("error", err);
          });
      },
      register() {
        this.showLoading();
          // register user
          if (this.password === this.passwordRetype) {
            this.$store
              .dispatch("user/REGISTER_USER", {
                username: this.username,
                password: this.password
              })
              .then(res => {
                this.loadingScreen.hide();
                this.showDialog("success", "Registrierung erfolgreich");
                this.loginMode = true;
              })
              .catch(err => {
                this.loadingScreen.hide();
                this.showDialog("error", "Fehler bei der Registrierung");
              });
          } else {
            this.loadingScreen.hide();
            this.showDialog("error", "Passwörter müssen übereinstimmen");
          }
      }
    }
  };
</script>

<style lang="css">
    body {
        background: #605b56;
    }

    .login-wrapper {
        background: #fff;
        width: 40%;
        margin: 12% auto;
    }

    .form-signin {
        max-width: 330px;
        padding: 10% 15px;
        margin: 0 auto;
    }

    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }

    .form-signin .checkbox {
        font-weight: normal;
    }

    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: -1px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
