<template>
    <div class="single-line" 
         v-bind:class="[(isFocused) ? 'foo' : 'is-placeholder']"
         v-model="cursor"
         @input="onInput()"
         @focus="focus()"
         @blur="blur()"
         @keydown.down="onArrowDown"
         @keydown.up="onArrowUp"
         @keydown.enter="onArrowEnter"
         contenteditable="true">{{innerText}}</div>
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
                debounceTime(100),
                distinctUntilChanged(),
                map((val: any) => {
                    let o = { value: val }
                    let list = this.events
                        .filter(v => val.charCodeAt(0) === v.code)
                    if(list.length ===0)
                        list.push(this.events[1])
                    return list
                        .map(v => Object.assign(v, o))
                }),
                map(e => this.emitter(e))
                //switchMap(() => interval(5000)),
                //          switchMap(this.streamSwitch),
            ),
        });
    },

    mounted() {
    }
})

export default class IntakeStream extends Vue {


    events:Stream[] = [
        { code:47, event: 'create' },
        { code:160, event: 'search' },
        { code:64, event: 'append' },
        { code:1, event: 'up' },
        { code:0, event: 'down' },
        { code:10, event: 'enter' },
        { code:32, event: 'search' },
    ]   
    stack:Stream[] = []
    cursor:string = ''
    focused:boolean = false
    index:number = 0

    @Prop() actionEvent: Stream

    print(val: Any) {
        console.log(val, 'print') 
        return val
    }

    emitter(val: Stream[]) {
        if(val.length > 0) {
            this.stack.push(val[0])
            this.$emit('interface', val[0]) 
        }
        return val
    }

    get innerText():String {
        return this.cursor
    }

    @Watch('actionEvent')
    onActionIndexChanged(value: Number, oldValue: Number) {
        console.log('AES', value.event, String.fromCharCode(value.code))
        this.$el.focus()

    }

    strip(str: String) {
        return str.replace(/(\r\n|\n|\r)/gm, "");
    }

    getText(): String {
        return this.strip(this.$el.innerText)
    }

    setText(str: String): String {
        return this.$el.innerText = this.strip(str)
    }

    onInput() {
        let text = this.strip(this.getText())
        if(!text.charCodeAt(0))  text = ' '
        this.cursor = text
        return
    }

    get isFocused():boolean { 
        return this.focused
    }

    focus() {
        //this.cursor = '' 
        //this.clear()
        //this.focused = true
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
        var input = this.getText()
        this.clear()
        console.log('onEnter',this.cursor, input)
        return false
    }

}
</script>

<style scoped lang="scss">
#tg-stream {
}
#tg-stream.is-placeholder {
}
[contenteditable="true"].single-line {
    white-space: nowrap;
    width:200px;
    overflow: hidden;
    display:inline-block;
    vertical-align:top;
    min-height:40px;
    max-height:40px;
    max-width:90%;
    min-width:90%;
    padding:0; 
    outline:none;
    font-size:1.5rem;
    margin-left:0.75rem;
} 
[contenteditable="true"].single-line.is-placeholder { 
    color:#d1d1d1;
}
[contenteditable="true"].single-line br {
    display:none;

}
[contenteditable="true"].single-line * {
    display:inline;
    white-space:nowrap;
}
</style>

