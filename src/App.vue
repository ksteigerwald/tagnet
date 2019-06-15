<template>
 <main id="app">
    <Header v-if="showHeader" />
     <transition name="fade" mode="out-in">
        <router-view></router-view>
     </transition>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue'

@Component({
    components: {
        Header,
    }
})
export default class App extends Vue { 
  protected: string[] = ['home', 'memorandums']
  showHeader: boolean = false 
  @Watch('$route', { immediate: true, deep: false})
  onRouteEnter() {
    if(this.protected.indexOf(this.$route.name) !== -1) {
      this.showHeader = true
    }
  //  console.log('ROUTE', this.$route)
  }


}
</script>
<style lang="scss">
html {
  height: 100%;
  background-color:#F4F4F4 !important;
}
body {
    height: 100%;
    margin: 0;
    padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";
</style>