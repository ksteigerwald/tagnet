<template>
 <section class="hero-sec">
    <div class="container">
            <div v-if="loading" class="loading"> <h1>Loading...</h1> </div>
            <div v-if="error" class="error"> <h1>Error...</h1> </div>
             <IntakeHandler 
                    @interface="onInterfaceChange"
                    :propList="syncData" />
           
            <MemoDetail v-if="memos.length > 0" />
            
     </div>
 </section>



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
