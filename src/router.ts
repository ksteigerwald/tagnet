import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Landing from './views/Landing.vue';
import Register from './views/Register.vue';
import Memorandum from './views/Memorandum.vue';
import Public from './views/Public.vue';

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
      path: '/register',
      name: 'register',
      component: Register,
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
      path: '/public/memorandums/:memoId',
      name: 'public',
      component: Public,
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
