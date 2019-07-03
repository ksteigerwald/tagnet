<template>
    <section class="hero-sec m-box">
        <div class="container">
             <IntakeHandler 
                    @interface="onInterfaceChange"
                    :propList="syncData" />
         
            <div class="main-area">
                <div class="col-one">
                    <!--- MAKE COMPONENT -->
                    <Wall :key="componentKey" />
                    <Loading v-if="loading" />
                    <div v-if="error" class="error"> <h1>Error...</h1> </div>
                </div>
                <ActivityLog />   
        </div>
     </div>

    <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Upload An Image</h3>
        <p slot="body">Put all your upload stuff here</p>
    </modal>

    </section>
   
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState, Fact, FactState } from '@/types'
import { mixins } from 'vue-class-component';

import Wall from '@/components/Wall.vue'
import Loading from '@/components/Loading.vue'
import Modal from '@/components/Modal.vue'
import ActivityLog from '@/components/ActivityLog.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'
import DropzoneMixIn from '@/helpers/dropzone'
import { globalEventBus } from '@/helpers/EventBus'

@Component({
    components: {
        IntakeHandler,
        Wall,
        ActivityLog,
        Modal,
        Loading,
    }
})
export default class Home extends mixins(CRUDMixIn, DropzoneMixIn) {

    loading: boolean = true
    error:boolean = false
    componentKey: number = 0
    showModal: boolean = false

    @Action('memos/loadWall') loadWall: any
    @Action('tags/loadTags') loadTags: any
    @Action('facts/loadFacts') loadFacts: any

    async beforeMount() {
        this.componentKey += 1; 
        this.loading = true

        await this.loadTags()
        await this.loadFacts()

        globalEventBus.$on('uploadModalOpen', () => {
            this.showModal = true
        })
        
        this.loadWall() 
            .then((e: any) => {
                this.loading = false
            })
    }
}
</script>
<style scoped lang="scss">
  
</style>