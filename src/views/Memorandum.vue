<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="columns is-mobile is-centered">
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
import RxTagnet from '@/components/RxTagnet.vue'
import MemoDetail from '@/components/Memorandum/Detail.vue'
@Component({
    components:{
        RxTagnet,
        MemoDetail,
    }
})
export default class Memorandum extends Vue {

    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any

    created() {
    }


}
</script>
