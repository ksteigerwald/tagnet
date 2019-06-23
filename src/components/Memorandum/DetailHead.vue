<template>
<div class="detail-head"> <a href="#" class="back-btn"><BackArrow/>Back</a>
    <h3>{{memo.label}}</h3>
    <a href="#" class="delete-btn"><span><TrashCan/></span>Delete</a> </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Memo } from '@/types'
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
}
</script>

<style scoped lang="scss">

</style>

