<template>
    <header v-if="loggedIn" id="header">
        <div class="container">

            <div class="main-head"> 
               <router-link :to="{ name: 'home'}">
                <img src="@/assets/images/logo.svg" alt="logo"></router-link>
                <form autocomplete="off" class="my-head-form">
                    <div class="main-search-box" id="main-search-box-two">
                        <div class="form-group position-relative autocomplete">
                            <input type="search" class="form-control"  placeholder="&#34;&#47;&#34;for Create,&#34;@&#34;for Append, or Search" id="myInput2" name="myCountry">
                            <img src="@/assets/images/feild-icon.svg" alt="" class="gol-img">
                            <button type="submit" class="creat-btn">Create <img src="@/assets/images/creat-btn.svg" alt=""></button>
                        </div>
                    </div>
                </form>
                <div class="head-brand ml-auto">
                    <div class="img-holder"><img :src="profile" alt=""> </div>
                </div>
            </div>
        </div>
    </header>
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

