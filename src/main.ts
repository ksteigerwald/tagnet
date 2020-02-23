import Vue from 'vue';
import VueRx from 'vue-rx'
import App from './App.vue';
import router from './router';
import store from './store';
import awsconfig from './helpers/aws-export'
import * as config from './helpers/config'
import "./assets/sass/app.scss";
import { State, Getter, Action, namespace } from 'vuex-class';
import { globalEventBus } from '@/helpers/EventBus'
import { ENOMEM } from 'constants';
import VueAnalytics from 'vue-analytics'
import Helpers from '@/helpers/Helpers'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Vue.config.productionTip = false;

Amplify.configure(awsconfig)
Vue.use(AmplifyPlugin, AmplifyModules)

Vue.use(VueRx)
//Vue.use(Buefy, { defaultIconPack: 'fas' })

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
//window.addEventListener("paste", paste, false);

let user; 

export function getUser() {
    return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
       // AmplifyStore.commit('setUser', data);
        return data;
      } 
    }).catch((e: any) => {
      //AmplifyStore.commit('setUser', null);
      return null
    });
}

router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      user = await getUser();
      console.log('USER:', user)
      if (!user) {
        return next({
          path: '/auth',
          query: {
            redirect: to.fullPath,
          }
        });
      }
      return next()
    }
    return next()
  })

Vue.use(VueAnalytics, {
    id: 'UA-143100940-1',
    //debug: { enabled: true },
    router,
    ignoreRoutes: ['/login']
})

new Vue({
    data() {
        return {
            Helpers
        }
    },
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

