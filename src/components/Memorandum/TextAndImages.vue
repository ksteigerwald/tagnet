<template >
 <li>
     <div class="todo-list">
         <div v-for="content in data" class="todo-list-main todo-list-main-two mb-0 detail-head">
             <ul class="goals-activity todo-timeline" id="todo-timeline2">
                 <li><span class="icon-activity">
                   <TextIcon v-if="getIcon(content) === 1" alt="" />
                   <WebLink v-if="getIcon(content) === 2" alt="" />
                   <Photo v-if="getIcon(content) === 3" alt="" />
                   </span>
                  </li>
             </ul>
             <div class="desgin-main-first desgin-main">
                <div v-if="!content.edit">
                 <p v-html="format(content)"></p>
                </div>
                <div v-if="content.edit">
                  <input type="text" v-model="content.newlabel" style="float: left;"/>
                  <span style="float: left; width: '30px'">
                    <a href="#" @click="edit(content)" style="margin: 0;padding: 3px 5px;">
                      <img src="/static/images/cancel.svg" alt="Cancel"/></a>
                    </a>
                  </span>
                  <span style="float: left; width: '30px'">
                    <a href="#" @click="update(content)"  style="margin: 0;padding: 3px 5px;">
                      <img src="/static/images/save.svg" alt="Save"/></a>
                    </a>
                  </span>
                </div>               
             </div>
             <div class="desgin-main-second desgin-main">
             <div class="sample-menu-style dropdown-menu">
                <a href="#" tabindex="0" onclick="return true">
                    <MenuList/>
                </a>
                <div tabindex="0" onclick="return true"></div>
                <ul class="dropdown-menu__sub">
                    <li><a href="#" @click="edit(content)">
                        <img src="/static/images/edit.svg" alt="">
                        Edit
                    </a>
                    </li>
                    <li><a href="#" @click="remove(content)"><img src="/static/images/delete.svg" alt="">Delete</a></li>
                </ul>
            </div>
            </div>
        </div>
    </div>
 </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {State, Getter, Action, namespace} from 'vuex-class';
import { Line, LineState } from '@/types'
import anchorme from "anchorme"
import { format } from 'path';
import TextIcon from '@/components/Icons/Text.vue'
import Photo from '@/components/Icons/Photo.vue'
import WebLink from '@/components/Icons/WebLink.vue'
import MenuList from '@/components/Icons/MenuList.vue'

@Component({
  components: {
    TextIcon,
    Photo,
    WebLink,
    MenuList,
  }
})
export default class TextAndImages extends Vue {
  @Prop() data: {
    lines: Line[] 
  }
 
  @Action('lines/deleteLine') deleteLine: any
  @Action('lines/editLine') editLine: any
  @Action('lines/editMode') editMode: any
  path: string = '@/assets/images/w'
  format(line: Line):string {    
    let {newlabel, format_id, label} = line
    if (format_id === 2) {
      return `<img src="${label}"/>`  
    }   
    return line.label
  }

  update(line: Line) {
    console.log('update called')
    if(line.edit == null || line.edit == false) {
      line.edit = true;
    } else {
      line.edit = false;
    }
    
    this.editLine(line);   
  }

  edit(line: Line) {
    if(line.edit == null || line.edit == false) {
      line.edit = true;
    } else {
      line.edit = false;
    }
    line.newlabel = line.label;
    this.editMode(line);   
  }

  remove(line: Line) {
    let check: boolean = confirm(`Are you sure you want to delete: ${line.label}`)
    if (check) {
      this.deleteLine(line)
    }
  }

  getIcon(line: Line): number {
    let { format_id } = line
    var img = '@/assets/images/'

    if(format_id === 1) {
      let linkCheck = line.label.match(/href=/)

      if (linkCheck) {
        return 2
      }
      return 1
    }

    if(format_id == 2) {
      return 3
    }
    return 1
  }

}
</script>

<style scoped lang="scss"></style>

