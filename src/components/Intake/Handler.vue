<template>
    <div :class="cssClasses"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import ActionToggle from '@/components/ActionToggle.vue'
import IntakeStream from '@/components/Intake/Stream.vue'
import Flyout from '@/components/Intake/Flyout.vue'
import { Context, Stream, Event, UIFlyout } from '@/types'
import { debug } from 'util';


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

    get cssClasses(): string {
        let context = [Context.memo, Context.line].indexOf(this.tick.context)
        let event = [Event.add, Event.add, Event.macro].indexOf(this.tick.event)
        let css = 'tagnet column is-half'
        return (context !== -1 && event !== -1) ? css : css + ' set-height'
    }

    get actionToggleIndex(): Stream {
        if(this.tick.context === Context.toggle) {
            //console.log(this.tick.context, this.tick.event)
            this.pointer = this.tick.context
        }
        return this.tick
    }
    
    onInterfaceChange(stream:Stream) {
        this.tick = stream || null
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
        border: 1px solid #cfcfcf;
    }
   .set-height {
        height:55px;
        min-height:55px;
   }
</style>
