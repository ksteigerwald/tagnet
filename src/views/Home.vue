<template>
  <div class="home">
    <Tagnet /> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import Tagnet from '@/components/Tagnet.vue'

@Component({
  components: {
      Tagnet,
  }
})
export default class Home extends Vue {
}
</script>
