<template>
    <a class="action-toggle" @click="toggleAction()" @tab="toggleAction()">
        <b-icon 
            :icon="iconClass" size="is-medium"></b-icon>
    </a>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class ActionToggle extends Vue { 
    ticker:string[] = ["search", "plus", "angle-right"]
    actions:string[] = ["search", "create", "find"]
    iconClass:string =  'search'
    index:number = 0
    
    mounted() {
        console.log('mount ActionToggle')
    }

    toggleAction(e: any) {
        this.index++
        if(this.index >= this.actions.length) 
            this.index = 0

        this.iconClass = this.ticker[this.index]

		this.$emit('clickActionToggle', this.actions[this.index])
    }
}
</script>

<style scoped lang="scss">
    a.action-toggle {
        display:inline-block;
        color:#D1D1D1;
    }
</style>
