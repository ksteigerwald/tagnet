<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-centered">
                    <IntakeHandler 
                    @interface="onInterfaceChange"
                    :context="current"
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
    @Getter('tags/filterTags') filterTags: (keys: any) => any[]
    @Getter('memos/filterMemos') filterMemos: (keys: any) => any[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('memos/newMemo') newMemo: Memo
    @Action('memos/createMemo') createMemo: any
    @Action('lines/createLine') createLine: any
    @Action('memos/searchMemos') searchMemos: any
    
    myData: String[] = []
    stack: any[] = []

    current: Context = Context.search

    created() {
        this.loadTags() 
        this.loadMemos() 
    }

    get syncData():any[] {
        return this.myData
    }

    keygen(stream: Stream): string {
        return stream.context + '-' + stream.event
    }


    onInterfaceChange(stream:Stream) {
        console.log(this.keygen(stream), 'HOME PAGE - onInterfaceChange')
        console.log('VALUE:', stream.value, stream)

        switch (this.keygen(stream)) {
            case 'create-open':
                this.myData = this.filterTags(stream.value)            
                this.current = stream.context
                break
            case 'memo-add':
                this.myData = this.filterTags(stream.value)            
                break
            case 'memo-create':
                break
            case 'line-add':
                this.myData = this.filterMemos(stream.value)            
                break
            case 'line-create':
                break
            case 'open-enter':
                console.log('HASHURA - search query no longer working, look into it')
                this.searchMemos(stream.value)

                break
            case 'click-flyout':
                this.myData = []
                //this.myData = this.searchMemos(stream.value)
                break
            default:
                this.current = Context.open
                this.myData = []
                break
        }

    }

}
</script>