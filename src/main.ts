import Vue from 'vue';
import VueRx from 'vue-rx'
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import * as config from './helpers/config'


Vue.config.productionTip = false;

Vue.use(VueRx)
Vue.use(Buefy, {
    defaultIconPack: 'fas'
})

router.beforeEach((to:any, from:any, next:any) => {

    const publicPages: string[] = ['/login', '/about']
    const authRequired = !publicPages.includes(to.path);

    if(to.path === "/callback") {
        let token = to.hash.split('&').pop().split('=').pop()
        localStorage.setItem(config.localKey('user'), token)
        router.push('/')
    }

    const loggedIn = localStorage.getItem(config.localKey('user'));

    if (authRequired && !loggedIn) { return next('/login'); }
    
    if(to.path === '/logout') {
        store.dispatch('user/logout') 
        window.location.reload()
    }

    next();
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

