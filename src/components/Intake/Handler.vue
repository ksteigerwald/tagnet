<template>
    <div class="intake column is-half">
        <ActionToggle
         v-bind:actionIndex="actionToggleIndex"
         @clickActionToggle="onActionToggleClick"/>
        <IntakeStream 
         v-bind:actionIndex="actionToggleIndex"
        /> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import ActionToggle from '@/components/ActionToggle.vue'
import IntakeStream from '@/components/Intake/Stream.vue'

@Component({
  components: {
      IntakeStream,
      ActionToggle
  }
})
export default class Handler extends Vue {

    index:Number = 0
    get actionToggleIndex(): Number {
        return this.index
    }

    onActionToggleClick(value:any) {
        console.log(value, 'onActionToggleClick')
        switch(value) {
            case 'create':
                this.index = 1
                this.tagnet = '/'
                //this.matches = this.tags
                break
            case 'find':
                this.index = 2
                this.tagnet = '@'
                //this.matches = this.memos
                break
            default:
                this.index = 0
                this.matches = []
                break
        }
    }
}
</script>

<style scoped lang="scss">
    .intake {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
