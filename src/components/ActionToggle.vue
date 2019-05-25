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
import { ContextSetter } from 'apollo-link-context';

@Component({})
export default class ActionToggle extends Vue { 
    
    @Getter('streams/findByContext') findByContext: (context: Context) => Stream[]
    
    actions: Stream [] 
    index:number = 0
    iconKey:string = 'search'
    @Prop() actionEvent: Stream
    @Prop() pointer: Context

    get icon() {
        return (<any>ToggleType)[this.iconKey]
    }

    mounted() {
        this.actions = this.findByContext(Context.toggle)
    }

    @Watch('actionEvent')
    onActionIndexChanged(value: Stream, oldValue: Stream) {
        if(value.context !== Context.toggle) return
        this.iconKey = value.event
    }

    toggleAction(e: any) {
        this.index++
        if(this.index >= this.actions.length -1) 
            this.index = 0

        console.log(this.index, this.actions[this.index])  
        //this.pointer = this.actions[this.index].context
        this.$emit('interface', this.actions[this.index])
    }

}
</script>

<style scoped lang="scss">
    a.action-toggle {
        display:inline-block;
        color:#D1D1D1;
    }
</style>
