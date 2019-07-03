<template>
    <Resize id="app" class="wrapper">
        <div class="overlay"></div>
        <Header v-if="showHeader" />
         <transition name="fade" mode="out-in">
            <router-view></router-view>
         </transition>
    </Resize>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Resize from '@/components/common/Resize';

@Component({
    components: {
        Header,
        Resize
    }
})
export default class App extends Vue { 

  protected: string[] = ['home', 'memorandums']
  showHeader: boolean = false 

  mounted() {
    console.log('+++++')
    console.log(this)
  }

  @Watch('$route', { immediate: true, deep: false })
  onRouteEnter() {
    if(this.protected.indexOf(this.$route.name) !== -1) {
      this.showHeader = true
    }
  //  console.log('ROUTE', this.$route)
  }
}
</script>
<!--<style lang="scss">-->
    <!--@import '@/assets/responsive.scss';-->
    <!--@import '@/assets/style.scss';-->
<!--</style>-->