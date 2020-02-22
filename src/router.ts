import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Landing from './views/Landing.vue';
import Register from './views/Register.vue';
import Confirm from './views/Confirm.vue';
import Memorandum from './views/Memorandum.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: <any> Landing,
    },
    {
      path: '/home',
      name: 'home',
      component: <any> Home,
    },
    {
      path: '/login',
      name: 'login',
      component: <any> Login,
    },
    {
      path: '/register',
      name: 'register',
      component: <any> Register,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: <any> Confirm,
    },
    {
      path: '/Logout',
      name: 'logout',
      component: <any> Login,
    },
    {
      path: '/memorandums/:memoId',
      name: 'memorandums',
      component: <any> Memorandum,
    },
    {
      path: '/profile',
      name: 'profile',
      component: <any> Profile,
    },
    {
      path: '/callback',
      name: 'callback',
      //component: <any> Login,
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
