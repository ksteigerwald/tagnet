<template>
    <div class="intake column is-half">
        <ActionToggle 
         v-bind:index="actionToggleIndex"
         @clickActionToggle="onActionToggleClick"/>
        <IntakeStream /> 
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

	actionToggleIndex: number = 2

    onActionToggleClick(value:any) {
        console.log(value, 'onActionToggleClick')
        switch(value) {
            case 'create':
                this.tagnet = '/'
                //this.matches = this.tags
                break
            case 'find':
                this.tagnet = '@'
                //this.matches = this.memos
                break
            default:
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
