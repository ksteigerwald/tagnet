<template>
<div class="main-catgaory">
    <!--- MAKE COMPONENT -->
    <div class="catgory-main">
        <Card v-for="(memo, key, index) in memos" :key="memo.id" :memo="memo" />
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'
import Card from '@/components/Card.vue'

@Component({
  components: {
    Card
  }
})
export default class Wall extends Vue {

    componentKey:number = 0
    
    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
   
    @Watch('memos')
    rerenderCards() {
        this.componentKey += 1
    } 

}
</script>

<style scoped lang="scss">
   
</style>

