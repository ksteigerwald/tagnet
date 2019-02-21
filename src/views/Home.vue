<template>
  <div class="home">
    <Tagnet /> 
    <Wall /> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import Tagnet from '@/components/Tagnet.vue'
import Wall from '@/components/Wall.vue'

@Component({
  components: {
      Tagnet,
      Wall
  }
})
export default class Home extends Vue {}
</script>
