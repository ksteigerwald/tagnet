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
                    <div v-if="loading" class="loading"> <h1>Loading...</h1> </div>
                    <div v-if="error" class="error"> <h1>Error...</h1> </div>
                </div>
                <ActivityLog />   
        </div>
     </div>
    </section>
   
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { mixins } from 'vue-class-component';

import Wall from '@/components/Wall.vue'
import ActivityLog from '@/components/ActivityLog.vue'
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'
import DropzoneMixIn from '@/helpers/dropzone'

@Component({
    components: {
        IntakeHandler,
        Wall,
        ActivityLog
    }
})
export default class Home extends mixins(CRUDMixIn, DropzoneMixIn) {

    loading: boolean = true
    error:boolean = false
    componentKey: number = 0

    @Action('memos/loadWall') loadWall: any
    @Action('tags/loadTags') loadTags: any

    async beforeMount() {

        this.componentKey += 1; 
        this.loading = true

        await this.loadTags()
        
        this.loadWall() 
            .then((e: any) => {
                this.loading = false
            })
    }
}
</script>
<style scoped lang="scss">
  
</style>