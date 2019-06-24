<template>
<div class="detail-head">  <router-link class="back-btn" :to="{ name: 'home'}"> <BackArrow/>Back</router-link>
    <h3>{{memo.label}}</h3>
    <a href="#" @click="remove()" class="delete-btn"><span><TrashCan/></span>Delete</a> </div>
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
  @Action('memos/deleteMemo') deleteMemo: any

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

