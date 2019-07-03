<template>
  <div :class="css">
    <ul class="goals-activity">
            <li><span class="icon-activity">
              <Search v-if="icon === 0" />
              <Goal v-if="icon === 1" />
              <Event v-if="icon === 2" />
              <Idea v-if="icon === 3" />
              <Any v-if="icon === 4" />
              <Topic v-if="icon === 5" />
              <Person v-if="icon === 6" />
              </span></li>
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

import Search from '@/components/Icons/Search.vue'
import Goal from '@/components/Icons/Goal.vue'
import Event from '@/components/Icons/Event.vue'
import Idea from '@/components/Icons/Idea.vue'
import Any from '@/components/Icons/Any.vue'
import Topic from '@/components/Icons/Topic.vue'
import Person from '@/components/Icons/Person.vue'

import { State, Getter, Action, namespace } from 'vuex-class';
import { Fact, FactState } from '@/types'
import { create } from 'domain';

@Component({
  components:{
    Search,
    Goal,
    Event,
    Idea,
    Any,
    Topic,
    Person,
  }
})
export default class ActivityLog extends Vue {
    
  @Prop() log: Fact
  icon: number = 0
  css:string = 'activity-one'
  cssRoot: string = 'activity-one'
  beforeMount() {
    switch(this.log.FactMemo.TagMemo.label) {
      case 'goal':
        this.icon = 1
        this.css = `${this.cssRoot}`
        break
      case 'event':
        this.icon = 2
        this.css = `${this.cssRoot} activity-two`
        break
      case 'idea':
        this.icon = 3
        this.css = `${this.cssRoot} activity-three`
        break
      case 'any':
        this.icon = 4
        this.css = `${this.cssRoot} activity-four`
        break
      case 'topic':
        this.icon = 5
        this.css = `${this.cssRoot} activity-five`
        break
      case 'person':
        this.icon = 6
        this.css = `${this.cssRoot} activity-six`
        break
      default:
        this.icon = 0
        this.css = `${this.cssRoot}`
        break
    }
  }
  get text() {
    var str: string = `NEW ${this.log.FactMemo.label}`
    if(this.log.search) str = this.log.search
    if(this.log.line_id) str = `[+] ${this.log.FactLine.label}`
    if(str.length < 20) return str
    return str.substring(0,20) + '...'
  }

  get heading() {
    return (this.log.search) ? 'Search' : this.log.FactMemo.TagMemo.label
  }
}
</script>

<style scoped lang="scss">
h4 {
  text-transform: capitalize;
}
</style>
