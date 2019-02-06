import Vue from 'vue'
import Router from 'vue-router'
import Store from './store/store'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue')
    }
  ]
});

router.onError(() => {
});

export default router;
