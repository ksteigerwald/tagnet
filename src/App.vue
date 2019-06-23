<template>
<div id="app" class="wrapper">
    <Header v-if="showHeader" />
     <transition name="fade" mode="out-in">
        <router-view></router-view>
     </transition>
</div>
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
    @import '@/assets/responsive.scss';
    @import '@/assets/style.scss';

</style>