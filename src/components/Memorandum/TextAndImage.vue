<template >
 <li>
     <div class="todo-list">
         <div v-for="content in data" class="todo-list-main todo-list-main-two mb-0">
             <ul class="goals-activity todo-timeline" id="todo-timeline2">
                 <li><span class="icon-activity"><img src="@/assets/images/web-link.svg" alt=""></span></li>
             </ul>
             <div class="desgin-main-first desgin-main">
                 <p v-html="format(content)"></p>
             </div>
        </div>
    </div>
 </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Line, LineState } from '@/types'

@Component({
  components: {}
})
export default class TextAndImages extends Vue {
  @Prop() data: Line[]

  format(line: Line):string {
   let {format_id, label} = line

    if(format_id === 2) {
      return `<img src="${label}"/>`
    }

    return line.label
  }

}
</script>

<style scoped lang="scss"></style>

