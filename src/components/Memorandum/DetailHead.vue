<template>
<div class="detail-head">  
  <router-link class="back-btn" :to="{ name: 'home'}"> <BackArrow /> &nbsp;Back</router-link>
    <h3 v-if="memo">{{memo.label}}</h3>
    <a href="#" v-if="!isPublic" @click="remove()" class="delete-btn"><span><TrashCan/></span>&nbsp;Delete</a> </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import {  Memo, MemoState } from '@/types'
import { TagType } from '@/store/tags'
import BackArrow from '@/components/Icons/BackArrow.vue'
import TrashCan from '@/components/Icons/Delete.vue'

@Component({
  components: {
    BackArrow,
    TrashCan
  }
})
export default class MemoDetailHead extends Vue {
  @Prop() memo: Memo
  @Prop() isPublic: boolean
  @Action('memos/deleteMemo') deleteMemo: any

  mounted() {
    console.log('>>>>', this.memo, this.isPublic) 
  }

  remove() {
    let check: boolean = confirm(`Are you sure you want to delete:${this.memo.label}`)
    if(check) {
      this.deleteMemo(this.memo)
      this.$router.push('/home')
    }
  }

}
</script>

<style scoped lang="scss">

</style>

