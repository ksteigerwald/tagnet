<template>
  <div class="deatil-main">
      <MemoDetailHead :memo="memo" />
        <ul class="loop-list">
            <li v-if="todos.length > 0"><span class="date">ToDo's</span></li>
            <TodoWrap v-if="todos.length > 0" :todos="todos" />
    
            <template v-for="date in dates"> 
                <li><span class="date"> {{date}} </span></li> 
                <TextAndImages :data="getGroupData(date)" />
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'
import Card from '@/components/Card.vue'
import TodoWrap from '@/components/Memorandum/TodoWrap.vue'
import TextAndImages from '@/components/Memorandum/TextAndImages.vue'
import MemoDetailHead from '@/components/Memorandum/DetailHead.vue'
import { groupBy, switchAll } from 'rxjs/operators';

@Component({
  components: {
      TodoWrap,
      MemoDetailHead,
      TextAndImages,
  }
})
export default class MemoDetail extends Vue {

    componentKey:number = 0
    memoId:number = 0 
    dates:string[] = []
    groupByObj: any = {}    
    memo: any 
    todos:Line[] = []

    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('lines/lines') lines: Line[]
    @Getter('lines/linesGroupBy') linesGroupBy: any
    @Getter('lines/formatSelect') formatSelect: (keys: any) => any[]
    @Getter('memos/findMemo') findMemo: any

    rerenderCards() {
        this.componentKey += 1
    } 

    beforeMount () {
        this.memoId = Number(this.$route.params.memoId)
        this.memo = this.findMemo(this.memoId)[0]
    }

    mounted() {
        this.$store.subscribe((mutation, state) => {
            switch(mutation.type) {
                case 'lines/addLine':
                    this.outputGroup()
                    break
                case 'lines/deleteLine':
                    console.log('deleteLine called')
                    this.outputGroup()
                    break    
                default:
                    break
            }
        })
    }

    @Watch('lines')
    outputGroup() {
        this.groupByObj = this.linesGroupBy
        this.todos = this.formatSelect(3)
        this.dates = Object.keys(this.linesGroupBy)
    }

    getGroupData(key: string): Line[] {
        return this.groupByObj[key]
    }

}
</script>

<style scoped lang="scss">
  
</style>

