<template>
  <div class="deatil-main">
      <MemoDetailHead :memo="memo" />
        <ul class="loop-list">
            <li><span class="date">ToDo's</span></li>
            <li>
                <div class="todo-list">
                    <div class="todo-list-main todo-list-main-first">
                        <ul class="goals-activity todo-timeline" id="timeline1">
                            <li><span class="icon-activity"><img src="@/assets/images/list-owl.svg" alt=""></span></li>
                        </ul>
                        <ToDo v-if="todos.length > 0" :todos="todos" />
                    </div>
                </div>
            </li>
            <template v-for="date in dates">
            <li> <span class="date">{{date}}</span></li>
            <li>
                <div class="todo-list">
                    <div v-for="content in getGroupData(date)" class="todo-list-main todo-list-main-two mb-0">
                        <ul class="goals-activity todo-timeline" id="todo-timeline2">
                            <li><span class="icon-activity"><img src="@/assets/images/web-link.svg" alt=""></span></li>
                        </ul>
                        <div class="desgin-main-first desgin-main">
                            <p v-html="format(content)"></p>
                        </div>
                   </div>
               </div>
            </li>
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

