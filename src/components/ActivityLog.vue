<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ActivityLog extends Vue {}
</script>

<style scoped lang="scss">
</style>
