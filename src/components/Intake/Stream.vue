<template>
    <div class="single-line" 
         v-bind:class="[(isFocused) ? 'foo' : 'is-placeholder']"
         @input="onInput()"
         @focus="focus()"
         @blur="blur()"
         @keydown.enter="onArrowEnter"
         contenteditable="true">
         {{cursor}}
         </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Subject, fromEvent, of, pipe, interval } from 'rxjs';
import { pluck, map, mapTo, debounceTime, tap, bufferTime,
    distinctUntilChanged, switchMap, filter, mergeMap } from 'rxjs/operators';


import { Context, Stream, Event, StreamState } from '@/types'

@Component<IntakeStream>({
    subscriptions() {
        return ({
            matches: this.$watchAsObservable('cursor').pipe(
                pluck('newValue'),
                debounceTime(100),
                distinctUntilChanged(),
                map((val: any) => {
                    let nv = val.replace(/(@|\/)/gm,'').toLowerCase()
                    let o = { value: nv || this.cursor }
                    console.log('o', o)
                    let list = this.events
                        .filter(v => val.charCodeAt(0) === v.code) ||
                        this.events
                            .filter(v => val.charCodeAt(0) === 160)

                    return list.map(v => Object.assign(v, o))
                }),
                map(e => this.emitter(e))
                //switchMap(() => interval(5000)),
                //          switchMap(this.streamSwitch),
            ),
        });
    },

    mounted() {
        this.focus()
    }
})

export default class IntakeStream extends Vue {

    @Prop() actionEvent: Stream

    stack:Stream[] = []
    cursor:string = ''
    focused:boolean = false
    index:number = 0

    $el:HTMLElement

    print(val: any) {
        console.log(val, 'print') 
        return val
    }

    @Getter('streams/streams') events: Stream[]

    emitter(val: Stream[]) {
        console.log('emmiter', val)
        if(val.length > 0) {
            this.$emit('interface', val[0]) 
        }
        return val
    }

    @Watch('actionEvent')
    onActionIndexChanged(value: Stream, oldValue: Stream) {
        //console.log('AES', value.event, String.fromCharCode(value.code))
        this.$el.focus()

    }

    strip(str: String) {
        return str.replace(/(\r\n|\n|\r)/gm, "");
    }

    getText(): string {
        return this.strip(this.$el.textContent || this.$el.innerText)
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

    onArrowEnter() {
        this.clear()
        return false
    }

}
</script>

<style scoped lang="scss">

#tg-stream {}
#tg-stream.is-placeholder {}

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

