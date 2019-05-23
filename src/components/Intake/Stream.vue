<template>
    <div id="tg-stream" 
        v-bind:class="[(isFocused) ? 'foo' : 'is-placeholder']"
        @focus="focus()"
        @blur="blur()"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onArrowEnter"
        contenteditable="true">
        {{cursor}}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Subject, fromEvent, of, pipe } from 'rxjs';
import { pluck, map, debounceTime, tap,
    distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component
export default class IntakeStream extends Vue {
    messages:String[] = [
        "What are you looking for?",
        "Create a new Item",
        "Add a to...",
    ]
    cursor:string = ''
    focused:boolean = false
    index:number = 0

    @Prop() actionIndex: Number

    @Watch('actionIndex')
    onActionIndexChanged(value: Number, oldValue: Number) {
        this.cursor = this.messages[value]
    }

    mounted() {
        this.index = this.actionIndex
        this.cursor = this.messages[this.index]
        console.log(this.index, this.actionIndex)
    }

    get isFocused():boolean { 
        return this.focused
    }

    focus() {
        this.cursor = '' 
        this.focused = true
    }

    blur() {
        this.focused = false
    }

    onArrowDown() {
        console.log('onArrowDown')    
    }

    onArrowUp() {
        console.log('onArrowUp')    
    }

    onArrowEnter(input: any) {
        console.log('onEnter')    
    }

}
</script>

<style scoped lang="scss">
    #tg-stream {
        display:inline-block;
        vertical-align:top;
        min-height:15px;
        max-width:95%;
        min-width:95%;
        padding:0 1rem 0rem 1rem;
        outline:none;
        font-size:1.5rem;
    }
    #tg-stream.is-placeholder {
        color:#d1d1d1;
    }
</style>

