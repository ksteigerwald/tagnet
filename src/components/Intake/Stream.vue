<template>
    <input class="single-line" 
         v-bind:class="[(isFocused) ? 'foo' : 'is-placeholder']"
         :value="cursor"
         @input="onInput()"
         @focus="focus()"
         @blur="blur()"
         @keydown.enter="onArrowEnter"
         contenteditable="true"/>
         
         
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Subject, Observable, fromEvent, of, pipe, interval, ConnectableObservable } from 'rxjs';
import { pluck, map, mapTo, debounceTime, tap, bufferTime,
    distinctUntilChanged, switchMap, filter, mergeMap, switchAll } from 'rxjs/operators';

import { Context, Stream, Event, StreamState } from '@/types'
import { log } from 'util';
import { EventEmitter } from 'events';

@Component<IntakeStream>({
    subscriptions() {
        return ({
            matches: this.$watchAsObservable('cursor').pipe(
                pluck('newValue'),
                debounceTime(100),
                distinctUntilChanged(),
                map(this.getContext),
                map(this.getEvent),
                map(this.emitter)
                //map(this.parser),
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

    $el:HTMLInputElement

    print(val: any) {
        console.log(val, 'print') 
        return val
    }

    @Getter('streams/streams') events: Stream[]

    getContext(str: string):Stream {
        var context = Context.open
        if(str.charAt(0) === '/')
            context = Context.memo
        if(str.charAt(0) === '@')
            context = Context.line
            
        return {context: context,  value: str, event: Event.search }
    }

    getEvent(pack: Stream):Stream  {
        var event = this.isSubmit(pack.value) ? Event.enter : Event.search   
        let index
        if(this.isCRUD(pack.context)) {
            event = this.isSubmit(pack.value) ? Event.create : Event.add   
        }
        let ev =  Object.assign(pack, { 
            event: event, 
            value: pack.value.replace(/(@|\/)/gm,'')
        })

        console.log('>', ev)
        return ev
    }

    isCRUD(context: Context): Boolean {
        let cruds = [Context.memo, Context.line]
        return cruds.indexOf(context) != -1
    }

    isSubmit(val: String): Boolean {
        var up = val.length
        return val.charAt(up -1) === '~' 
    }

    emitter(val: Stream) {
        console.log(val)
        this.$emit('interface', val) 
        return val
    }

    @Watch('actionEvent')
    onActionIndexChanged(stream: Stream, oldStream: Stream) {
        if(!stream.value) return
        if(stream.value.code) {
            console.log('STREAM:', stream.value)
            this.$el.value = this.cursor.charAt(0) + stream.value.code + ' '
        }
        //console.log('AES', value.event, String.fromCharCode(value.code))
        this.$el.focus()

    }

    onInput() {
        //This makes the observerable tick
        this.cursor = this.$el.value
    }
    
    get isFocused():boolean { 
        return this.focused
    }

    //legacy methods

    focus() {
        //this.cursor = '' 
        //this.clear()
        //this.focused = true
    }

    setText(str: String): String {
        return this.$el.innerText = this.strip(str)
    }

    clear() {
        this.setText('')
    }

    blur() {
        //this.focused = false
    }
    
    onArrowEnter() {
        let pre = this.cursor.charAt(0).match(new RegExp(/(@|\/)/gm,'')) 
        let boundary = this.cursor.split(' ').length
        let append = (boundary >=2 || pre === null) ? '~' : ' '
        console.log('PRE', pre, append)
        
        //This is very important as it requeues for completion
        //space is stripped in stream
        
        this.cursor = this.cursor + append

        this.clear()
        return false
    }

    strip(str: String) {
        return str.replace(/(\r\n|\n|\r)/gm, "");
    }

    getText(): string {
        return this.strip(this.$el.textContent || this.$el.innerText)
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

