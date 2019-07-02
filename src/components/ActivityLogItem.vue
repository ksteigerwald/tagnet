<template>
  <div class="activity-one">
    <ul class="goals-activity">
            <li><span class="icon-activity"><img src="@/assets/images/gol-two.svg" alt=""></span></li>
            <li><span class="line-box"></span></li>
   </ul>
    <div class="activity-conatnt">
      <h4>{{heading}}</h4>
      <p>{{text}}</p>
      <span>16/06/19, 14:25</span> </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { State, Getter, Action, namespace } from 'vuex-class';
import { Fact, FactState } from '@/types'
import { create } from 'domain';

@Component
export default class ActivityLog extends Vue {
    
  @Prop() log: Fact
  heading: string = ''

  get text() {
    if(this.log.search) return this.log.search
    if(this.log.line_id) return `[+] ${this.log.FactLine.label}`
    return `NEW ${this.log.FactMemo.label}`
  }
  beforeMount() {
    this.heading = (this.log.search) ? 'Search' : this.log.FactMemo.TagMemo.label
  }
}
</script>

<style scoped lang="scss">
h4 {
  text-transform: capitalize;
}
</style>
