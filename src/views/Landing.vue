<template>
<div class="Landing Page">
  <h1>Hello World!</h1>
  <router-link :to="{ name: 'home' }">Home</router-link>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Landing extends Vue {}
</script>

<style scoped lang="scss">
</style>

