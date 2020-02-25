<template>
 <section class="hero-sec m-box">
    <div class="hero-sec__container">
            <MemoDetail :isPublic="isPublic" :memo="memo" />
            <Loading v-if="loading" />
            <div v-if="error" class="error"> <h1>Error...</h1> </div>
     </div>
 </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'

import ActivityLog from '@/components/ActivityLog.vue'


import MemoDetail from '@/components/Memorandum/Detail.vue'
import Loading from '@/components/Loading.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'

@Component({
    components:{
        MemoDetail,
        Loading,
    }
})
export default class MemorandumPublic extends Vue {

    isPublic: boolean = true
    loading: boolean = true
    error:boolean = false
    memo: Memo = null

    @Action('lines/linesByMemoPublic') linesByMemoPublic: any
    @Action('memos/fetchPublicMemo') fetchPublicMemo: any
    @Getter('memos/memos') memos!: Memo[]
    
    async beforeMount() {
        this.loading = true
        let memoCode = String(this.$route.params.code)
        await this.fetchPublicMemo(memoCode) 
        this.memo = this.memos[0]
        let memoId = this.memo.id
        console.log(this.memos)

        this.linesByMemoPublic(memoId) 
            .then((e: any) => {
                this.memo = this.memos.filter(memo => memo.id === memoId)[0]
                this.loading = false
            })

    }
}
</script>
