<template>
    <li>
      <div class="todo-list">
        <div class="todo-list-main todo-list-main-first">
          <ul class="goals-activity todo-timeline" id="timeline1">
            <li><span class="icon-activity"><img src="@/assets/images/list-owl.svg" alt=""></span></li>
          </ul>
        <Todo :todos="todos" />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

import Todo from '@/components/Memorandum/todo.vue'
@Component({
  components: {
      Todo,
  }
})
export default class TodoWrap extends Vue {
  @Prop() todos: Line[]

}
</script>

<style scoped lang="scss">
</style>
