<template>
    <div class="tagnet column is-half"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter">
        <ActionToggle
            :pointer="context"
            :actionEvent="actionToggleIndex"
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
import { Context, Stream, Event, UIFlyout } from '@/types'


@Component({
 components: {
      IntakeStream,
      ActionToggle,
      Flyout
  }
})
export default class Handler extends Vue {

    tick:Stream = {context: Context.toggle, event: Event.search}
    pointer:Context = Context.search
    @Prop() propList: any[]
    @Prop() arrowHandler: Stream
    @Prop() context: Context

    $refs!: {
        flyout: any 
    }

    get actionToggleIndex(): Stream {
        if(this.tick.context === Context.toggle) {
            //console.log(this.tick.context, this.tick.event)
            this.pointer = this.tick.context
        }
        return this.tick
    }
    
    onInterfaceChange(stream:Stream) {
        this.tick = stream
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
    .tagnet {
        border-radius:30px;
        background:#fff;
        z-index: 5;
        position: absolute;
    }
</style>
