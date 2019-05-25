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
        return stream.event + '-' + stream.context
    }


    onInterfaceChange(stream:Stream) {
        console.log(this.keygen(stream), 'HOME PAGE - onInterfaceChange')

        switch (this.keygen(stream)) {
            case 'create-open':
                this.myData = this.filterTags(stream.value)            
                this.current = stream.context
                break
            case 'create-toggle':
                this.myData = this.filterTags(stream.value)            
                break
            case 'append-open':
                this.myData = this.filterMemos(stream.value)            
                break
            case 'append-toggle':
                this.myData = this.filterMemos(stream.value)            
                break
            case 'enter-open':
                //console.log('HASHURA - search query no longer working, look into it')
                this.myData = []
                if(this.stack.length < 0)
                    console.log(this.stack, this.stack.pop())    

                if(stream.value && stream.value !== " ")
                    this.stack.push(stream.value)
                    console.log('pushing', stream.value, stream, this.stack)    
                console.log(stream.value !== " ") 
                //this.searchMemos(stream.value)
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