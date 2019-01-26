import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'
import VueNativeNotification from 'vue-native-notification'
 
Vue.use(VueNativeNotification, {
  requestOnNotify: true
});

Vue.config.productionTip = false;
Vue.use(Notifications)

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get () { return this.$root.bus } })

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  data: {
    bus
  },
  render: h => h(App)
}).$mount('#app');
