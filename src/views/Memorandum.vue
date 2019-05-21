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
            <h1>hello</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import RxTagnet from '@/components/RxTagnet.vue'
@Component({
    components:{
        RxTagnet
    }
})
export default class Memorandum extends Vue {

    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any

    created() {
        this.loadTags() 
        this.loadMemos() 
    }


}
</script>
