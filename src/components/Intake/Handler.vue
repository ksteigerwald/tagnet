<template>
    <div class="intake column is-half">
        <ActionToggle
         v-bind:actionEvent="actionToggleIndex"
         @interface="onInterfaceChange"/>
        <IntakeStream 
         @interface="onInterfaceChange"
         v-bind:actionEvent="actionToggleIndex"
        /> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import ActionToggle from '@/components/ActionToggle.vue'
import IntakeStream from '@/components/Intake/Stream.vue'
import { Stream } from '@/types'

@Component({
 components: {
      IntakeStream,
      ActionToggle
  }
})
export default class Handler extends Vue {

    tick:Stream = { code:160, event: 'search' }

    get actionToggleIndex(): Stream {
        return this.tick
    }

    onInterfaceChange(stream:Stream) {
        this.tick = stream
        console.log(stream.event, stream.value, 'onInterfaceChange')
    }
}
</script>

<style scoped lang="scss">
    .intake {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
