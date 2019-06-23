<template>
<div class="detail-head"> <a href="#" class="back-btn"><img src="images/back-arrow.svg" alt="">Back</a>
    <h3>{{memo.label}}</h3>
    <a href="#" class="delete-btn"><span><img src="images/delete.svg" alt=""></span>Delete</a> </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Memo } from '@/types'
@Component
export default class MemoDetailHead extends Vue {
  @Prop() memo: Memo
}
</script>

<style scoped lang="scss">

</style>

