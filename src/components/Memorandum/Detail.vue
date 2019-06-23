<template>
  <div class="deatil-main">
      <MemoDetailHead :memo="memo" />
      <ToDo v-if="todos.length > 0" :todos="todos" />
       

        <div class="todo-list"> <span class="date">18-06-2019</span>
            <div class="todo-list-main todo-list-main-two">
                <ul class="goals-activity todo-timeline" id="todo-timeline">
                    <li><span class="icon-activity"><img src="images/web-link.svg" alt=""></span></li>
                    <li><span class="line-box"></span></li>
                    <li><span class="icon-activity"><img src="images/frame-landscape.svg" alt=""></span></li>
                    <li><span class="line-box"></span></li>
                    <li><span class="icon-activity"><img src="images/text-height-adjustment.svg" alt=""></span></li>
                    <li><span class="line-box"></span></li>
                </ul>
                <div class="desgin-main">
                    <p>Everything you need to know about skeleton screens</p>
                    <a href="#">https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a</a>
                    <div class="brand-holder">
                        <p>5 things I wish new designers knew </p>
                        <img src="images/brand.png" alt=""> </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nunc tortor, rhoncus sed suscipit non, ullamcorper nec nisi. Vestibulum vitae turpis sagittis, euismod urna nec, porta augue. Vestibulum in purus vehicula, dignissim lacus eu, auctor tortor. Fusce eget fringilla felis, id convallis massa. Mauris ac posuere mauris. Mauris non felis at velit pharetra consectetur. Quisque ac ultricies enim. Donec eu nunc varius enim tempor ullamcorper ac nec ligula.</p>
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

@Component({
  components: {
      ToDo,
      MemoDetailHead,
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

