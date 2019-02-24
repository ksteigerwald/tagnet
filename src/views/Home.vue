<template>
  <div class="home columns is-mobile is-centered">
    <div class="column is-half">
        <Tagnet /> 
        <Wall /> 
    </div>
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
export default class Home extends Vue {
	
    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any

    created() {
        this.loadTags() 
        this.loadMemos() 
    }

}
</script>
