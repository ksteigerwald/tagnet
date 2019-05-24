<template>
    <ul class="intake">
          <li 
                v-for="(match, i) in list"
                :key="i"
                :class="{ 'is-active': i === index }"
                @click="onClick(i)">
                    <a href="#">{{match.label}}</a>
                </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Stream } from '@/types'

@Component({
 components: {}
})
export default class Flyout extends Vue {

    index:number = 0

    @Prop() signal: Stream
    @Prop() list: any[]

    arrowCounter: number = 0

    mounted() {
        console.log('..', this.list)
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
        console.log(sig) 
    }

    onClick(i:number) {
        let stream: Stream = {
            context: 'flyout', 
            code:0, 
            event: 'click',  
            value: this.list[i]
        }
        this.index = 0
        this.$emit('interface', stream)
    }
   
}
</script>

<style scoped lang="scss">
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
    	}
        li:hover,
        li.is-active {
            background: #cfcfcf;;
        }
        li > a {
            padding-left:2.25rem;
        }
    }
    
    
</style>
