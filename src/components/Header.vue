<template>
<div v-if="loggedIn" class="header">
    <span class="profile" :style="cssStr"></span>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TagType } from '@/store/tags'

@Component({
  components: {}
})
export default class Header extends Vue {
  profile: string = localStorage.getItem('TAGNET-picture')
  cssStr: string = ''
  loggedIn: boolean = true

  beforeMount() {
    this.cssStr = `background-image:url(${this.profile});` 
  }
}
</script>

<style scoped lang="scss">
  div.header {
    position: relative;
    height: 50px;
    span.profile {
      position:absolute;
      right: 1rem;
      top:1rem;
        border-radius: 50%;
        background-size:25px 25px;
        height: 25px;
        width: 25px;
        display: block;
        border:1px solid;
      }
  }
</style>

