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
import { Stream, IToggleType} from '@/types'

@Component({})
export default class ActionToggle extends Vue { 
    
    actions:Stream[] = [
        { code:160, event: 'search' },
        { code:47, event: 'create' },
        { code:64, event: 'append' }
    ]   
    tick:Stream = {code:-1, event:''}
    index:number = 0 
    @Prop() actionEvent: Stream

    get icon() {
        return (<any>ToggleType)[this.tick.event]
    }

    mounted() {
        this.tick = this.actions[0]
        console.log('mount', this.tick.event)
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
