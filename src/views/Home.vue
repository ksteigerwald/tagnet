<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-centered handler-wrap set-height">
                    <IntakeHandler 
                    @interface="onInterfaceChange"
                    :propList="syncData" />
                </div>
            </div>
        </div>
        <div class="section">
            <Wall />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import RxTagnet from '@/components/RxTagnet.vue'
import Wall from '@/components/Wall.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import { TagType } from '@/store/tags'
import { Context, Event, Stream,  Tag, TagState, Memo, 
        MemoState, Line, LineState } from '@/types'

@Component({
    components: {
        RxTagnet,
        IntakeHandler,
        Wall
    }
})
export default class Home extends Vue {

    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any
    @Getter('tags/tags') tags!: Tag[]
    @Getter('tags/findByCode') findTagByCode: any
    @Getter('memos/findByCode') findMemoByCode: any
    @Getter('tags/filterTags') filterTags: (keys: any) => any[]
    @Getter('memos/filterMemos') filterMemos: (keys: any) => any[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('memos/newMemo') newMemo: Memo
    @Action('memos/createMemo') createMemo: any
    @Action('lines/createLine') createLine: any
    @Action('memos/searchMemos') searchMemos: any
    
    stack: any[] = []

    created() {
        this.loadTags() 
        this.loadMemos() 
    }

    intakeData: String[] = []
    get syncData():any[] {
        return this.intakeData
    }

    keygen(stream: Stream): string {
        return stream.context + '-' + stream.event
    }

    splitter(str: string): any {
        let data = str.split(' ') 
        let code = data.shift()

        return { code: code, value: data.join(' ')}
    }
    onInterfaceChange(stream:Stream) {
        console.log(this.keygen(stream), 'HOME PAGE - onInterfaceChange')

        switch (this.keygen(stream)) {
            case 'create-open':
                this.intakeData = this.filterTags(stream.value)            
                break
            case 'memo-add':
                this.intakeData = this.filterTags(stream.value)            
                break
            case 'memo-create':
                var obj = this.splitter(stream.value)
                var tag = this.findTagByCode(obj.code).pop()
                this.createMemo({
                    label: obj.value,
                    tag_id: tag.id
                })
                console.log(obj, tag)
                break
            case 'line-add':
                this.intakeData = this.filterMemos(stream.value)            
                break
            case 'line-create':
                var obj:any = this.splitter(stream.value)
                var memo:Memo = this.findMemoByCode(obj.code).pop()
                this.createLine({
                    label: obj.value,
                    memo_id: memo.id
                })
                break
            case 'open-enter':
                this.searchMemos(stream.value)
                break
            case 'click-flyout':
                this.intakeData = []
                //this.intakeData = this.searchMemos(stream.value)
                break
            default:
                this.intakeData = []
                break
        }

    }

}
</script>
<style scoped lang="scss">
    .handler-wrap {
        z-index:1;
        position: relative;
    }
</style>