<template>
<div class="main-catgaory">
    <!--- MAKE COMPONENT -->
    <FilterBar :tags="tags" />
    <div class="catgory-main">
        <Card v-if="filterByTag(memo)" v-for="(memo, key, index) in memos" :key="memo.id" :memo="memo" />
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'
import Card from '@/components/Card.vue'
import FilterBar from '@/components/FilterBar.vue'
import { mount } from '@vue/test-utils';
import { globalEventBus } from '@/helpers/EventBus';

@Component({
  components: {
    Card,
    FilterBar
  }
})
export default class Wall extends Vue {

    componentKey:number = 0
    tagId:number = -1

    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    
    filterByTag(memo: Memo) {
      if(this.tagId === -1) return true
      if(memo.tag_id === this.tagId) return true
      return false
    }

    mounted() {
      globalEventBus.$on('filterWall', (data: Tag) => {
        this.tagId = data.id
      })
    }
    
    @Watch('memos')
    rerenderCards() {
        this.componentKey += 1
    } 

}
</script>

<style scoped lang="scss">
   
</style>

