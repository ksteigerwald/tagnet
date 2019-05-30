<template>
<div class="memo-detail container">
    <ul>
        <li v-for="memo in memos">
            <h1>{{memo.id}} - {{memo.label}}</h1>
        </li>
    </ul>
    <div class="cloumns is-multiline is-centered">
    <div class="column is-half is-center">

        <ul>
            <li v-for="line in lines">
               <p v-html="line.label">  </p>
            </li>
        </ul>
    </div>
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
  components: {}
})
export default class Wall extends Vue {

    componentKey:number = 0
    memoId:number = 0 

    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('lines/lines') lines: Line[]
    @Action('lines/linesByMemo') linesByMemo: any
    @Getter('memos/findMemo') findMemo: any
    @Action('memos/getMemo') getMemo: any

    rerenderCards() {
        this.componentKey += 1
    } 

	created() {
        this.memoId = Number(this.$route.params.memoId)
        this.getMemo(this.memoId)
        this.linesByMemo(this.memoId) 
	}
}
</script>

<style scoped lang="scss">
    ul {
        li {
           margin-bottom:1.5rem; 
        }
    }
</style>

