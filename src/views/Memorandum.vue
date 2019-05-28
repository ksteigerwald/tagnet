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
            <MemoDetail />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import IntakeHandler from '@/components/Intake/Handler.vue'
import MemoDetail from '@/components/Memorandum/Detail.vue'
import { Context, Event, Stream,  Tag, TagState, Memo, 
        MemoState, Line, LineState } from '@/types'
@Component({
    components:{
        IntakeHandler,
        MemoDetail,
    }
})
export default class Memorandum extends Vue {

    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any

    created() {
    }

    intakeData: String[] = []
    get syncData():any[] {
        return this.intakeData
    }

    onInterfaceChange(stream:Stream) { 

    }

}
</script>
