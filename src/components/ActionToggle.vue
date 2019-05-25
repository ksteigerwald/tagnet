<template>
    <a class="action-toggle" 
        @click="toggleAction()" 
        @tab="toggleAction()">
        <b-icon 
            :icon="icon" size="is-medium"></b-icon>
    </a>
</template>

<script lang="ts">
enum ToggleType {
    create = "plus",
    search = "search",
    append = "angle-right"
}

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Context, IToggleType, Stream, Event, StreamState } from '@/types'

@Component({})
export default class ActionToggle extends Vue { 
    
    @Getter('streams/findByContext') findByContext: (context: Context) => Stream[]
    
    actions: Stream [] 
    tick:Stream = {context: Context.toggle, code:64, event: Event.append}
    index:number = 0 
    @Prop() actionEvent: Stream

    get icon() {
        return (<any>ToggleType)[this.tick.event]
    }

    mounted() {
        this.actions = this.findByContext(Context.toggle)
        this.tick = this.actions[0]
    }

    @Watch('actionEvent')
    onActionIndexChanged(value: Stream, oldValue: Stream) {
        let set = this.actions.filter( t => t.event === value.event)
        this.tick = set[0] || this.actions[0]
    }


    toggleAction(e: any) {
        this.index++
        if(this.index >= this.actions.length) 
            this.index = 0
        this.tick = this.actions[this.index]
        this.$emit('interface', this.tick)
    }
}
</script>

<style scoped lang="scss">
    a.action-toggle {
        display:inline-block;
        color:#D1D1D1;
    }
</style>
