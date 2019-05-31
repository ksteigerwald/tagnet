<template>
    <ul :class="isOpen()">
          <li 
                v-for="(match, i) in list"
                :key="i"
                :class="{ 'is-active': i === index && hover === false}"
                @mouseover="hover = true"
                @mouseleave="hover = false"
                @click="onClick(i)">
                    <a href="#">{{match.label}}</a>
                </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Stream, Context, Event } from '@/types'

@Component({
    components: {}
})
export default class Flyout extends Vue {

    index:number = 0

    @Prop() signal: Stream
    @Prop() list: any[]

    hover: boolean = false
    arrowCounter: number = 0

    @Watch('list')
    isOpen():string {
         if(this.list.length > 0) return 'intake open'
         return 'intake'
    }

    down() {
        if(!this.list) return
        if (this.index < this.list.length - 1) {
            this.index = this.index + 1;
        }
    }

    up() {
        if (this.index > 0) {
            this.index = this.index - 1;
        }
    }

    onSignal(sig: string) {
        if(sig === 'up')
            this.up()
        if(sig === 'down')
            this.down()

        if(sig === 'enter')
            this.onClick(this.index)
    }

    onClick(i:number) {
        let stream: Stream = {
            context: Context.flyout, 
            event: Event.click,  
            value: this.list[i]
        }
        this.index = 0
        this.$emit('interface', stream)
    }
   
}
</script>

<style scoped lang="scss">
    ul.intake.open {
        padding-top:1rem;
        border-top: 1px solid #cfcfcf;
   } 
    ul.intake {
        display:flex;  
        flex-direction:column;;
        li {
            display:block;
		    margin: 0;
		    padding: 0;
		    position: relative;
		    transition: all linear 0.1s;	
            text-transform: capitalize;
            background-position: 10px 3px;
    	}
        li:hover,
        li.is-active {
            background:url('~@/assets/carrot.svg');
            background-repeat: no-repeat;
            background-position: 10px 3px;
        }
        li > a {
            padding-left:2.25rem;
        }
    }
    
</style>
