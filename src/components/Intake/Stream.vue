<template>
    <div id="tg-stream" 
        v-bind:class="[(isFocused) ? 'foo' : 'is-placeholder']"
        v-model="cursor"
        @input="onInput()"
        @focus="focus()"
        @blur="blur()"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onArrowEnter"
        contenteditable="true">
        {{innerText}}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Subject, fromEvent, of, pipe, interval } from 'rxjs';
import { pluck, map, mapTo, debounceTime, tap, bufferTime,
    distinctUntilChanged, switchMap, filter, mergeMap } from 'rxjs/operators';
import { Stream } from '@/types'

@Component<IntakeStream>({
    subscriptions() {
        return ({
            matches: this.$watchAsObservable('cursor').pipe(
                pluck('newValue'),
                debounceTime(200),
                distinctUntilChanged(),
                map((val: any) => {
                    let list = this.events.filter((v) => {
                        return val.charCodeAt(0) === v.code
                    })
                    return list
                }),
                map(e => this.fooo(e))
                //switchMap(() => interval(5000)),
      //          switchMap(this.streamSwitch),
            ),
        });
    },

    mounted() {
        this.cursor = this.messages[this.index]
    }
})

export default class IntakeStream extends Vue {

    messages:String[] = [
        "What are you looking for?",
        "Create a new Item",
        "Add a to..." ]

    events:Stream[] = [
        { code:47, event: 'create' },
        { code:160, event: 'search' },
        { code:64, event: 'append' },
        { code:1, event: 'up' },
        { code:0, event: 'down' },
        { code:10, event: 'enter' },
    ]   

    cursor:string = ''
    focused:boolean = false
    index:number = 0

    @Prop() actionEvent: Stream

    fooo(val: Any) {
        if(val.length > 0)
            this.$emit('interface', val[0]) 
        //this.$emit('interface', this.events[1]) 
        return val
    }
    
    get innerText():String {
        return this.cursor
    }
    
    @Watch('actionEvent')
    onActionIndexChanged(value: Number, oldValue: Number) {
        console.log('AES', value.event)
        //this.cursor = this.getText() + this.messages[value]
        //this.setText(this.cursor)
        //this.focused = false
    }

    getText(): String {
        return this.$el.innerText 
    }

    setText(val: String): String {
        return this.$el.innerText = val
    }

    onInput(value: Any) {
        this.cursor = this.getText()
        return
        let key:String = this.getText().charAt(0)
        console.log(key)
        if(key === '/') {
            this.setText('/')
            this.index = 1
            this.$emit('interface', this.index) }
        if(key === '@') {
            this.setText('@')
            this.index = 2
            this.$emit('interface', this.index) }

        this.focused = true
    }

    

    get isFocused():boolean { 
        return this.focused
    }

    focus() {
        this.cursor = '' 
        this.clear()
        this.focused = true
    }

    clear() {
        this.setText('')
    }

    blur() {
        //this.focused = false
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
        max-width:92%;
        min-width:92%;
        padding:0 1rem 0rem 1rem;
        outline:none;
        font-size:1.5rem;
    }
    #tg-stream.is-placeholder {
        color:#d1d1d1;
    }
</style>

