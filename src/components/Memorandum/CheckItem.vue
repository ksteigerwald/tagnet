<template>
 <label class="check-area">
    <input type="checkbox" 
    true-value="1"
    false-value="0"
    checked
    v-model="index">
    <span class="checkmark"></span> 
    <span>{{todo.label}}</span> 
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace,  } from 'vuex-class';
import { Line, LineState } from '@/types'

@Component({
  components: {
  }
})
export default class Todo extends Vue {

  @Prop() todo: Line
  index:string = "0"

  mounted() {
    this.index = this.todo.meta.checked
  }

  checkState(): string {
    return (this.todo.meta.checked === "0") ? "" : "checked"
  }

  @Watch('index')
  async select(){
    let val = (this.index === "1") ? "1" : "0"
    this.todo.meta.checked = val
    await this.$store.dispatch('lines/updateLineMeta', this.todo)
    this.$emit('sort')
  }

}
</script>

<style scoped lang="scss">
   
</style>