<template>
<div class="memo-detail container">
    <ul>
        <li>
            <h1>{{memo.id}} - {{memo.label}}</h1>
        </li>
    </ul>
    <div class="columns is-multiline is-centered">
    <div class="column is-half ">
        <ul>
            <li class="slot" v-for="date in dates">
                {{date}}
            <ul>
                <li v-for="line in getGroupData(date)">
                    <p v-html="format(line)">  </p>
                </li>
            </ul>
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
import { groupBy, switchAll } from 'rxjs/operators';

@Component({
  components: {}
})
export default class Wall extends Vue {

    componentKey:number = 0
    memoId:number = 0 
    dates:string[] = []
    groupByObj: any = {}    
    memo: any 
    @Getter('tags/tags') !tags: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('lines/lines') lines: Line[]
    @Getter('lines/linesGroupBy') linesGroupBy: any
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
            return `<img src="https://tagnet.s3.amazonaws.com/${label}"/>`
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
        this.dates = Object.keys(this.linesGroupBy)
    }

    getGroupData(key: string): Line[] {
        return this.groupByObj[key]
    }

}
</script>

<style scoped lang="scss">
    ul {

        li.slot {
            margin-bottom:2rem;
            background:#fff;
            margin-bottom:1.5rem; 
            padding:1rem;
            ul > li {
                margin-bottom: 1rem;
            }
        }
    }
</style>

