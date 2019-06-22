import Vue from 'vue';
import VueRx from 'vue-rx'
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import * as config from './helpers/config'
import { State, Getter, Action, namespace } from 'vuex-class';
import { globalEventBus } from '@/helpers/EventBus'
import { ENOMEM } from 'constants';


Vue.config.productionTip = false;

Vue.use(VueRx)
Vue.use(Buefy, {
    defaultIconPack: 'fas'
})

function emitter(eventKey: string) {
    return function(e: any) {
        e.preventDefault();
        globalEventBus.$emit(eventKey, e);
    }
}

let dragCenter = emitter('WindowDragCenter')
let dragLeave = emitter('WindowDragLeave')
let dragOver = emitter('WindowDragOver')
let drop = emitter('WindowDrop')
let paste = emitter('WindowPaste')

window.addEventListener("dragcenter", dragCenter);
window.addEventListener("dragleave", dragLeave);
window.addEventListener("dragover", dragOver);
window.addEventListener("drop", drop);
window.addEventListener("paste", paste, false);



function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

router.beforeEach((to:any, from:any, next:any) => {

    const publicPages: string[] = ['/login', '/about', '/']
    const authRequired = !publicPages.includes(to.path);

    if(to.path === "/callback") {
        let token = to.hash.split('&').pop().split('=').pop()
        let data = parseJwt(token)

        localStorage.setItem(config.localKey('user'), token)
        localStorage.setItem(config.localKey('picture'), data.picture)

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

