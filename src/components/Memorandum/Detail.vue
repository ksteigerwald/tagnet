<template>
  <div class="deatil-main">
      <MemoDetailHead :memo="memo" />
      <ToDo v-if="todos.length > 0" :todos="todos" />
       

        <div class="todo-list"  v-for="date in dates">  
            <span class="date">{{date}}</span>
            <div class="todo-list-main todo-list-main-two">
                <ul class="goals-activity todo-timeline" id="todo-timeline">
                    <!-- 
                    <li><span class="icon-activity"><WebLink/></span></li>
                    <li><span class="line-box"></span></li>
                    <li><span class="icon-activity"><FrameLandscape/></span></li>
                    <li><span class="line-box"></span></li>
                    <li><span class="icon-activity"><TextIcon/></span></li>
                    <li><span class="line-box"></span></li>
                    -->
                </ul>
                <div class="desgin-main">
                    <ul>
                        <li v-for="line in getGroupData(date)">
                            <p v-html="format(line)">  </p>
                        </li>
                    </ul>
                </div>
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
import ToDo from '@/components/Memorandum/todo.vue'
import MemoDetailHead from '@/components/Memorandum/DetailHead.vue'
import { groupBy, switchAll } from 'rxjs/operators';

import WebLink from '@/components/Icons/WebLink.vue'
import FrameLandscape from '@/components/Icons/FrameLandscap.vue'
import TextIcon from '@/components/Icons/Text.vue'

@Component({
  components: {
      ToDo,
      MemoDetailHead,
      WebLink,
      FrameLandscape,
      TextIcon,

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

    format(line: Line):string {
        let {format_id, label} = line

        if(format_id === 2) {
            return `<img src="${label}"/>`
        }

        return line.label
    }

    mounted() {
        this.$store.subscribe((mutation, state) => {
            switch(mutation.type) {
                case 'lines/addLine':
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

