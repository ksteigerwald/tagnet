<template>
 <main id="app">
     <transition name="fade" mode="out-in">
        <router-view></router-view>
     </transition>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue { }
</script>
<style lang="scss">
html {
  height: 100%
}
body {
    background:#F4F4F4;
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
