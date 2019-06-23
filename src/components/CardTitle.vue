<template>
  <h2>
    <span v-if="card === 'goal'"><Goal></Goal></span>
    <span v-if="card === 'any'"><Any></Any></span>
    <span v-if="card === 'idea'"><Idea></Idea></span>
    <span v-if="card === 'person'"><Person></Person></span>
    <span v-if="card === 'topic'"><Topic></Topic></span>
    <span v-if="card === 'event'"><Event></Event></span>
      {{memo.TagMemo.label}}
  </h2>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import {  Memo, MemoState } from '@/types'
import { TagType } from '@/store/tags'
import Goal from '@/components/Icons/Goal.vue'
import Tag from '@/components/Icons/Tag.vue'
import Any from '@/components/Icons/Any.vue'
import Idea from '@/components/Icons/Idea.vue'
import Person from '@/components/Icons/Person.vue'
import Topic from '@/components/Icons/Topic.vue'
import Event from '@/components/Icons/Event.vue'
import Writting from '@/components/Icons/Writting.vue'

@Component({
    components:{
        Goal,
        Any,
        Idea,
        Person,
        Topic,
        Event,
    }
})
export default class Card extends Vue {

    @Prop() memo:Memo
    card:string = null

    created() {
      this.card = this.memo.TagMemo.label
    }

}
</script>

<style scoped lang="scss">
</style>
