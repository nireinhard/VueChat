import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'
import VueNativeNotification from 'vue-native-notification'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
import VueCookies from 'vue-cookies'
import sse from 'vue-sse';

Vue.use(VueCookies);
Vue.use(sse);

Vue.use(VueNativeNotification, {
  requestOnNotify: true
});

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(Loading);

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get () { return this.$root.bus } });

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  data: {
    bus
  },
  render: h => h(App)
}).$mount('#app');
