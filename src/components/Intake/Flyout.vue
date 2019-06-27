<template>
    <ul :class="isOpen()">
          <li v-for="(match, i) in list"
              :key="i"
              :class="{ 'is-active': i === index && hover === false}"
              @mouseover="hover = true"
              @mouseleave="hover = false"
              @click="onClick(i)">
                <a href="#">{{match.label}}</a> </li>
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
    ul.intake {
      display: none;
   } 
    ul.intake.open {
      display: block;
      padding-top:1rem;
   } 
    ul.intake {
        //position: absolute;
	    background-color: #fff;
	    //width: 99.8%;
	    border-radius: 0px 0px 12px 12px;
	    padding: 10px 0 21px 0px;
	    border: 1px solid #F4F4F4;
	    border-top: none;
	    margin-top: -9px;
        //overflow: hidden;
        overflow-y:scroll;
        max-height: 200px;
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
        li {
            padding: 8px 12px;
	        cursor: pointer;
	        color: #1A1A1A;
	        font-size: 14px;
            padding-left: 68px;
            display:block;
		    transition: all linear 0.1s;	
            text-transform: capitalize;
            background-position: 35px 4px;
    	}
        li:hover,
        li.is-active {
            background:url('~@/assets/carrot.svg');
            background-repeat: no-repeat;
            background-position: 35px 4px;
        }
        li > a {
            color:#FF6956;
        }
    }
    
</style>
