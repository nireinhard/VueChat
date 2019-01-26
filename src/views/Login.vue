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

      <div v-if="error.show">
        <hr>
        <b-alert show variant="danger">{{error.message}}</b-alert>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted() {},
  data() {
    return {
      loginMode: true,
      username: "",
      password: "",
      passwordRetype: "",
      error: {
        show: false,
        message: ""
      }
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
    showLoading(callback) {
      let loader = this.$loading.show({
        // Optional parameters
        canCancel: false,
        onCancel: null
      });
      callback(loader);
    },
    toggleMode() {
      this.loginMode = !this.loginMode;
    },
    sendForm() {
      this.showLoading(loader => {
        this.loginMode
          ? this.login()
              .then(() => {
                loader.hide();
                // redirect to chats
                this.$router.push({ name: "chat" });
              })
              .catch(() => {
                loader.hide();
              })
          : this.register()
              .then(() => {
                loader.hide();
                this.loginMode = true;
              })
              .catch(() => {
                loader.hide();
              });
      });
    },
    login() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("user/LOGIN_USER", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            this.showDialog("success", "Erfolgreich angemeldet");
            resolve();
            // extract jwt token
            console.log(res);
            const token = res.headers.authorization;
            console.log(token);
            // set jwt token
          })
          .catch(err => {
            // show error
            this.$notify({
              group: "all",
              type: "error",
              text: err
            });

            reject();
          });
      });
    },
    register() {
      return new Promise((resolve, reject) => {
        // register user
        if (this.password === this.passwordRetype) {
          this.$store
            .dispatch("user/REGISTER_USER", {
              username: this.username,
              password: this.password
            })
            .then(res => {
              this.showDialog("success", "Registrierung erfolgreich");
              resolve();
            })
            .catch(err => {
              this.showDialog("error", "Fehler bei der Registrierung");
              reject();
            });
        } else {
          this.showDialog("error", "Passwörter müssen übereinstimmen");
          reject();
        }
      });
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