<template>
<div class="todo-list"> 
  <div class="todo-list-main">

      <ul class="goals-activity todo-timeline">
          <li><span class="icon-activity"><img src="images/list-owl.svg" alt=""></span></li>
          <li><span class="line-box"></span></li>
      </ul>

      <div class="check-main">
          <!-- <h5>Today Todo-list</h5> -->
          <div class="main-check-box">
            <CheckItem  v-for="(todo, i) in todos" :todo="todo" @sort="sortTodos" :key="todo.code" />
          </div>
      </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mount } from '@vue/test-utils';

import { State, Getter, Action, namespace,  } from 'vuex-class';
import { Line, LineState } from '@/types'
import { dispatch } from 'rxjs/internal/observable/pairs';

import CheckItem from '@/components/Memorandum/CheckItem.vue'
@Component({
  components: {
    CheckItem
  }
})
export default class Todo extends Vue {

  @Prop() todos: Line[]
  index:number = 0

  mounted() {
    this.sortTodos()
  }  

  sortTodos() {
    console.log('SORT IT')
    this.todos.sort((a,b) => {
      return Number(b.meta.checked) - Number(a.meta.checked)
    })
  }

}
</script>

<style scoped lang="scss">
   
</style>