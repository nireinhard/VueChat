<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="sendForm">
      <h2 class="form-signin-heading" v-if="loginMode">Einloggen</h2>
      <h2 class="form-signin-heading" v-else>Registrieren</h2>

      <label for="inputEmail" class="sr-only">E-Mail Addresse</label>
      <input
        v-model="email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="E-Mail Addresse"
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
  data() {
    return {
      loginMode: true,
      email: "",
      password: "",
      passwordRetype: "",
      error: {
        show: false,
        message: ""
      }
    };
  },
  methods: {
    toggleMode() {
      this.loginMode = !this.loginMode;
    },
    sendForm() {
      this.loginMode ? this.login() : this.register();
    },
    login() {
      // log user in
      this.$notify({
        group: "all",
        type: "error",
        text: "Login failed",
      });
    },
    register() {
      // register user
       this.password === this.passwordRetype ? null :
       this.$notify({
        group: "all",
        type: "error",
        text: "Register failed",
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
.form-signin input[type="email"] {
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