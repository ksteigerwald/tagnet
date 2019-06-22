<template>
  <ul>
    <li class="slot">
      Get it done!
      <ul>
          <li 
                v-for="(match, i) in todos"
                :key="i">
                  <span @click="select(i, $event)" :index="i" :class="getClass(i)"></span>
                    {{match.label}}
                </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mount } from '@vue/test-utils';

import { State, Getter, Action, namespace,  } from 'vuex-class';
import { Line, LineState } from '@/types'
import { dispatch } from 'rxjs/internal/observable/pairs';

@Component({
  components: {}
})
export default class Todo extends Vue {

  @Prop() todos: any []
  defaultCSS: string = "far fa-square"
  checkClass: string = this.defaultCSS
  index:number = 0

  mounted() {
    this.sortTodos()
  }  

  sortTodos() {
    this.todos.sort((a,b) => {
      return Number(b.meta.checked) - Number(a.meta.checked)
    })
  }

  getClass(index: number ) : string {
    let onOff = this.todos[index].meta.checked
    return (onOff === "0") ? this.defaultCSS : "fas fa-check" 
  }

  async select(i: number, e: any){
    let onOff = this.todos[i].meta.checked

    let val = (onOff === "0") ? "1" : "0"
    this.todos[i].meta.checked = val
    
    e.target.className = (onOff === "0") ? this.defaultCSS : "fas fa-check" 
    await this.$store.dispatch('lines/updateLineMeta', this.todos[i])
    this.sortTodos()
  }

}
</script>

<style scoped lang="scss">
    ul {

        li.slot {
            margin-bottom:2rem;
            background:#fff;
            margin-bottom:1.5rem; 
            ul > li {
                padding:0 0 0 1rem;
                margin:0 0 0 1rem;
                text-align:left;
                border-left: #C4EFF5 1px solid;
                p {
                    padding:1rem 0;
                }
            }
        }
    }
</style>