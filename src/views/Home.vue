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
                <div class="col-two">
                    <h3>Recent Activity</h3>
                    <div class="activity-one">
                        <ul class="goals-activity">
                            <li><span class="icon-activity"><img src="@/assets/images/gol-two.svg" alt=""></span></li>
                            <li><span class="line-box"></span></li>
                        </ul>
                        <div class="activity-conatnt">
                            <h4>Goals</h4>
                            <p>Create Design System</p>
                            <span>16/06/19, 14:25</span> </div>
                    </div>
                    <div class="activity-one activity-two">
                        <ul class="goals-activity">
                            <li><span class="icon-activity"><img src="@/assets/images/calendar.svg" alt=""></span></li>
                            <li><span class="line-box"></span></li>
                        </ul>
                        <div class="activity-conatnt">
                            <h4>Event</h4>
                            <p>Tomorrow: Kickoff meeting ...</p>
                            <span>16/06/19, 14:25</span> </div>
                    </div>
                    <div class="activity-one activity-three">
                        <ul class="goals-activity">
                            <li><span class="icon-activity"><img src="@/assets/images/light-two.svg" alt=""></span></li>
                            <li><span class="line-box"></span></li>
                        </ul>
                        <div class="activity-conatnt">
                            <h4>Idea</h4>
                            <p>New optimization algorithm</p>
                            <span>16/06/19, 14:25</span> </div>
                    </div>
                    <div class="activity-one activity-four">
                        <ul class="goals-activity">
                            <li><span class="icon-activity"><img src="@/assets/images/all.svg" alt=""></span></li>
                            <li><span class="line-box"></span></li>
                        </ul>
                        <div class="activity-conatnt">
                            <h4>Any</h4>
                            <p>Good articles bookmark</p>
                            <span>16/06/19, 14:25</span> </div>
                    </div>
                    <div class="activity-one activity-five">
                        <ul class="goals-activity">
                            <li><span class="icon-activity"><img src="@/assets/images/topic.svg" alt=""></span></li>
                        </ul>
                        <div class="activity-conatnt">
                            <h4>Topic</h4>
                            <p>Inspiration - Startup Thinking</p>
                            <span>16/06/19, 14:25</span> </div>
                    </div>
                    <div class="all-activity"> <a href="#">See All Activity</a> </div>
                </div>
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
import IntakeHandler from '@/components/Intake/Handler.vue'
import CRUDMixIn from '@/helpers/crudMixin'
import DropzoneMixIn from '@/helpers/dropzone'

@Component({
    components: {
        IntakeHandler,
        Wall
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