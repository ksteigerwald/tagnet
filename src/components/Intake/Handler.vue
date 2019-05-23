<template>
    <div class="intake column is-half">
        <ActionToggle
         v-bind:actionIndex="actionToggleIndex"
         @interface="onInterfaceChange"/>
        <IntakeStream 
         @interface="onInterfaceChange"
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

    onInterfaceChange(value:any) {
        this.index = value
        console.log(value, 'onInterfaceChange')
    }
}
</script>

<style scoped lang="scss">
    .intake {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
