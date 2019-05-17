<template>
  <div class="home columns is-mobile is-centered">
    <div class="column is-half">
        <RxTagnet />
        <TagnetOld />
        <Wall />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import RxTagnet from '@/components/RxTagnet.vue'
import Wall from '@/components/Wall.vue'

@Component({
  components: {
      RxTagnet,
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
