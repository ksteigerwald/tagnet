<template>
    <div class="handler column is-half"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter">
        <ActionToggle
            v-bind:actionEvent="actionToggleIndex"
            @interface="onInterfaceChange"/>
        <IntakeStream 
            @interface="onInterfaceChange"
            v-bind:actionEvent="actionToggleIndex" /> 
        <Flyout
            ref="flyout"
            @interface="onInterfaceChange"
            v-bind:list="propList" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import ActionToggle from '@/components/ActionToggle.vue'
import IntakeStream from '@/components/Intake/Stream.vue'
import Flyout from '@/components/Intake/Flyout.vue'
import { Stream, UIFlyout } from '@/types'

@Component({
 components: {
      IntakeStream,
      ActionToggle,
      Flyout
  }
})
export default class Handler extends Vue {

    tick:Stream 
    @Prop() propList: any[]
    @Prop() arrowHandler: Stream

    $refs!: {
        flyout: any 
    }

    get actionToggleIndex(): Stream {
        return this.tick
    }
    
    onInterfaceChange(stream:Stream) {
        this.tick = stream
        console.log(stream.code, stream.event,  'HANDLER COMP - onInterfaceChange')
        this.$emit('interface', stream) 
    }

    onArrowDown() {
        this.$refs.flyout.onSignal('down')
    }

    onArrowUp() {
        this.$refs.flyout.onSignal('up')
    }
  
    onEnter(input: any) {
        this.$refs.flyout.onSignal('enter')
    }

}
</script>

<style scoped lang="scss">
    .handler {
        border-bottom: 1px solid #EDEDED; 
    }
</style>
