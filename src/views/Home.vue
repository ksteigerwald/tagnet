<template>
    <section class="hero-sec">
        <div class="container">
            <form autocomplete="off">
                <div class="main-search-box">
                    <div class="form-group position-relative autocomplete">
                        <input type="search" class="form-control"  placeholder="&#34;&#47;&#34;for Create,&#34;@&#34;for Append, or Search" id="myInput" name="myCountry">
                        <img src="@/assets/images/feild-icon.svg" alt="" class="gol-img">
                        <button type="submit" class="creat-btn">Create <img src="@/assets/images/creat-btn.svg" alt=""></button>
                    </div>
                </div>
            </form>
            <div class="main-area">
                <div class="col-one">
                    <!--- MAKE COMPONENT -->
                    <Wall :key="componentKey" />
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