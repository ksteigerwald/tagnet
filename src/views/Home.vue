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
                    <IntakeHandler v-bind:propList="myData" />
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
    myData: String[] = ['a','b']
    created() {
        this.loadTags() 
        this.loadMemos() 
    }

}
</script>
