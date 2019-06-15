import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Landing from './views/Landing.vue';
import Memorandum from './views/Memorandum.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/Logout',
      name: 'logout',
      component: Login,
    },
    {
      path: '/memorandums/:memoId',
      name: 'memorandums',
      component: Memorandum,
    },
    {
      path: '/callback',
      name: 'callback',
      //component: Login,
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
