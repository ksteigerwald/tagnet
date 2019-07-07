<template>
<div id="btn-upload">
  <svg @click="open()"  xmlns="http://www.w3.org/2000/svg" width="31.645" height="31.645" viewBox="0 0 31.645 31.645">
    <path class="icon-fill" data-name="Path 175" d="M265.822,1506.48a12.658,12.658,0,1,0-12.658-12.658A12.659,12.659,0,0,0,265.822,1506.48Zm0,3.164a15.822,15.822,0,1,1,15.822-15.822A15.822,15.822,0,0,1,265.822,1509.644Zm-1.582-17.4v-4.755a1.582,1.582,0,0,1,3.164,0v4.755h4.755a1.582,1.582,0,0,1,0,3.165H267.4v4.753a1.582,1.582,0,0,1-3.164,0V1495.4h-4.755a1.582,1.582,0,0,1,0-3.165Z" transform="translate(-250 -1478)" fill="#dedede" fill-rule="evenodd"/>
  </svg>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { globalEventBus } from '@/helpers/EventBus'

@Component
export default class Upload extends Vue {
  open() {
    globalEventBus.$emit('uploadModalOpen')
  }
}
</script>

<style scoped lang="scss">

</style>
