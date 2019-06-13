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

         <div v-if="loading" class="section loading">
             <div class="container">
                <div class="columns align-center is-mobile is-centered handler-wrap set-height">
                    Loading...
                </div>
            </div>
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="memos.length > 0" class="section">
            <MemoDetail />
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'

import MemoDetail from '@/components/Memorandum/Detail.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'

@Component({
    components:{
        IntakeHandler,
        MemoDetail,
    }
})
export default class Memorandum extends mixins(CRUDMixIn) {

    loading: boolean = true
    error:boolean = false

    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any
    @Action('lines/linesByMemo') linesByMemo: any

    @Getter('memos/memos') memos!: Memo[]
    
    async beforeMount() {
        this.loading = true
        let memoId = Number(this.$route.params.memoId)

        await this.loadTags() 
        await this.loadMemos() 
        this.linesByMemo(memoId) 
            .then((e: any) => {
                this.loading = false
            })

    }
}
</script>
