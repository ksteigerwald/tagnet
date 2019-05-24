<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-centered">
                    <RxTagnet />
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-centered">
                    <IntakeHandler 
                    @interface="onInterfaceChange"
                    v-bind:propList="syncData" />
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
import { Stream,  Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

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

    created() {
        this.loadTags() 
        this.loadMemos() 
    }

    get syncData():any[] {
        return this.myData
    }

    keygen(stream: Stream): string {
        return stream.event + '-' + stream.context
    }

    onInterfaceChange(stream:Stream) {
        console.log(this.keygen(stream), 'HOME PAGE - onInterfaceChange')

        switch (this.keygen(stream)) {
            case 'stream-create':
                this.myData = this.filterTags(stream.value)            
                break
            case 'stream-append':
                this.myData = this.filterMemos(stream.value)            
                break
            case 'onEnter-search':
                console.log('HASHURA - search query no longer working, look into it')
                this.myData = []
                //this.myData = this.searchMemos(stream.value)
                break
            case 'click-flyout':
                this.myData = []
                console.log(stream.value.label)
                //this.myData = this.searchMemos(stream.value)
                break
            default:
                this.myData = []
                break
        }

    }

}
</script>