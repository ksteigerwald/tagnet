<template>
<div class="wall container">
    <Card v-if="memos.length > 0" :key="componentKey" :memos="memos" />
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
    .card {
        margin-bottom: 1rem;
        padding:1rem;
        h2 {
            text-align:left;
        }
        ul {
            li {
                text-align:left;
            }
        }
    }
</style>

