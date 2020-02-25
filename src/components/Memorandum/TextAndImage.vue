<template >
 <li>
     <div class="todo-list">
         <div v-for="content in data" class="todo-list-main todo-list-main-two mb-0">
             <ul class="goals-activity todo-timeline" id="todo-timeline2">
                 <li><span class="icon-activity">
                   <TextIcon v-if="getIcon(content) === 1" alt="" />
                   <WebLink v-if="getIcon(content) === 2" alt="" />
                   <Photo v-if="getIcon(content) === 3" alt="" />
                   </span></li>
             </ul>
             <div class="desgin-main-first desgin-main">
                 <p v-if="content.format_id === 1" v-html="content.label"></p>
                 <p v-if="content.format_id === 2">
                   <amplify-s3-image :imagePath="s3Path(content)" />
                 </p>
             </div>
        </div>
    </div>
 </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Line, LineState, User, UserState } from '@/types'
import anchorme from "anchorme"
import { format } from 'path';
import TextIcon from '@/components/Icons/Text.vue'
import Photo from '@/components/Icons/Photo.vue'
import WebLink from '@/components/Icons/WebLink.vue'
import { S3Image, S3Album } from 'aws-amplify-vue/src/components/storage'

@Component({
  components: {
    TextIcon,
    Photo,
    WebLink,
    AmplifyS3Image: S3Image,
    AmplifyS3Album: S3Album
  }
})
export default class TextAndImages extends Vue {

  @Prop() userId: string
  @Prop() data: Line[]  
  @Getter('user/user') user: User

  
  path: string = '@/assets/images/w'
  format(line: Line):string {
    return line.label
  }

  s3Path(line: Line): string {
    return `${this.userId}/${line.label}`
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

<style lang="scss">
  .desgin-main {
    p {
      img {
        width:100%;
        max-width:500px;
        display: block;
      }
    }
  }
</style>

