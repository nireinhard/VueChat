import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/store'

Vue.use(Router);

const router = new Router({
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      beforeEnter: (to, from, next) => {
        if(Store.state.user.currentUser.token === null){
          next(new Error("Nicht angemeldet"));
        }else{
          next();
        }
      },
      component: () => import('./views/Chat.vue')
    }
  ]
});

router.onError(() => {
});

export default router;
