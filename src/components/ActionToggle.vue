<template>
    <a class="action-toggle" 
        @click="toggleAction()" 
        @tab="toggleAction()">
        
    <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="flyout" transform="translate(-350.000000, -177.000000)" fill="#4A4A4A">
                <g id="Group" transform="translate(350.000000, 177.000000)">
                    <path d="M15.1242568,10.7553579 C17.4001475,10.7553579 19.2446421,12.5998525 19.2446421,14.8757432 C19.2446421,17.1516339 17.4001475,18.9961285 15.1242568,18.9961285 C12.8483661,18.9961285 11.0038715,17.1516339 11.0038715,14.8757432 C11.0038715,12.5998525 12.8483661,10.7553579 15.1242568,10.7553579 Z M11.0444301,21.6112366 C12.2353782,22.3348389 13.6318846,22.7524082 15.1242568,22.7524082 C19.4667926,22.7524082 23,19.2192008 23,14.8757432 C23,10.5332074 19.4667926,7 15.1242568,7 C10.7807992,7 7.24851362,10.5332074 7.24851362,14.8757432 C7.24851362,16.3681154 7.66516108,17.7646218 8.38876342,18.9555699 L5.68424206,21.6600913 L3,24.3443333 C3.77430059,25.3343319 4.66566806,26.2256994 5.65566668,27 L11.0444301,21.6112366 Z" id="Fill-12-Copy"></path>
                    <path d="M14.9995507,0 C6.7152913,0 0,6.7152913 0,14.9995507 C0,18.482552 1.18975588,21.6842894 3.18106934,24.2300434 L5.79421896,21.6168938 L5.79781339,21.6132994 C5.04837502,20.5736109 4.47057062,19.4027258 4.1048375,18.1419799 C4.09854725,18.1195148 4.092257,18.0970496 4.08596675,18.0736858 C4.05181968,17.9514752 4.01857121,17.828366 3.98801857,17.7043582 C3.9790325,17.668414 3.97184364,17.6324697 3.96285757,17.5965254 C3.91972443,17.4132095 3.88198293,17.2298937 3.84783585,17.043882 C3.83255953,16.9594129 3.8163846,16.8749438 3.8029055,16.7895762 C3.790325,16.7140932 3.78133892,16.6386102 3.77055564,16.5631272 C3.75707653,16.4624832 3.74359742,16.3618391 3.73191553,16.2611951 C3.72472667,16.1911038 3.71753782,16.1210124 3.71124757,16.0509211 C3.70046428,15.9350007 3.69237682,15.819979 3.68428935,15.7040587 C3.68069492,15.6456492 3.67710049,15.5881384 3.67350607,15.5297289 C3.66631721,15.3536019 3.66092557,15.1774749 3.66092557,14.9995507 C3.66092557,14.8279167 3.66631721,14.65808 3.67350607,14.4891418 C3.94218961,8.47566272 8.91418302,3.6654186 14.9914632,3.66092557 C14.9941591,3.66092557 14.9968549,3.66092557 14.9995507,3.66092557 C21.2520593,3.66092557 26.3390744,8.74704208 26.3390744,14.9995507 L26.3390744,15.0040437 C26.3363786,21.0849184 21.5234387,26.0596076 15.5063651,26.3255953 C15.3383256,26.3336828 15.1693874,26.3390744 14.9995507,26.3390744 C13.9140332,26.3390744 12.8653587,26.1836154 11.8714992,25.8978583 L11.4347761,26.33548 L9.01572563,28.7536319 C10.8488842,29.5533922 12.8716489,30 14.9995507,30 C23.2838101,30 30,23.2847087 30,14.9995507 C30,6.7152913 23.2838101,0 14.9995507,0" id="Fill-14-Copy"></path>
                </g>
            </g>
        </g>
    </svg>
        <!-- <b-icon 
            :icon="icon" size="is-medium"></b-icon> -->
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
        height:30px;
    }
</style>
