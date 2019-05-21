<template>
<div class="wall container">
    <Card :key="componentKey" :memos="memos" />
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
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
    @Action('memos/loadWall') loadWall: any
    @Action('lines/loadLines') loadLines: any
    
    rerenderCards() {
        this.componentKey += 1
    } 

	created() {
        this.loadWall() 
        this.loadLines() 
        /*

        this.$store.subscribe((action, state) => {
            console.log(action.type)
            console.log(action.payload)
            setTimeout(() => { console.log(this, 'to');this.componentKey++}, 500)
        })
        */
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

