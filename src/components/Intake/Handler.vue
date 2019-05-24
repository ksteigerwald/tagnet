<template>
    <div class="intake column is-half">
        <ActionToggle
         v-bind:actionEvent="actionToggleIndex"
         @interface="onInterfaceChange"/>
        <IntakeStream 
         @interface="onInterfaceChange"
         v-bind:actionEvent="actionToggleIndex" /> 
        <Flyout
            v-bind:list="propList" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import ActionToggle from '@/components/ActionToggle.vue'
import IntakeStream from '@/components/Intake/Stream.vue'
import Flyout from '@/components/Intake/Flyout.vue'
import { Stream } from '@/types'

@Component({
 components: {
      IntakeStream,
      ActionToggle,
      Flyout
  }
})
export default class Handler extends Vue {

    tick:Stream = { context: 'none', code:160, event: 'search' }
    @Prop() propList: any[]

    get actionToggleIndex(): Stream {
        return this.tick
    }
    
    onInterfaceChange(stream:Stream) {
        this.tick = stream
        console.log(stream.code, stream.event, stream.value, 'handler - onInterfaceChange')
        this.$emit('interface', stream) 
    }
}
</script>

<style scoped lang="scss">
    .intake {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
