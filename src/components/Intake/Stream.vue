<template>
    <input class="form-control" 
         v-bind:class="[(isFocused) ? 'foo' : 'is-placeholder']"
         :value="cursor"
         @input="onInput()"
         @focus="focus()"
         @blur="blur()"
         placeholder="'/' To create a new bucekt, '@' to add to that bucket"
         @keyup.enter="submitHandler" />
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
            ),
            formData: this.$createObservableMethod('submitHandler').pipe(
                pluck('newValue'),
                map(this.onEntered),
                debounceTime(200),
                map(this.onSubmit),
            )
        })
    },

    mounted() {
        this.focus()
    }
})

export default class IntakeStream extends Vue {

    @Prop() actionEvent: Stream

    domStreams: ['plus$']

    tail:string = '\u2800'
    stack:Stream[] = []
    cursor:string = ''
    focused:boolean = false
    index:number = 0

    $el:HTMLInputElement

    print(val: any) {
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

        if(this.isCRUD(pack.context)) {
            event = this.isSubmit(pack.value) ? Event.create : Event.add   
        }

        //determine if an app is being invoked
        if(event === Event.add) {
            let tokens = pack.value.split(' ')
            if(tokens.length >= 2) {
                let keyed = tokens[1].charAt('0')
                if(keyed === '/') {
                    event = Event.macro
                }
            }
        }

        return Object.assign(pack, { 
            event: event, 
            value: this.sanitize(pack.value)
        })
    }

    sanitize(str: string): string {
        let subs = str.substring(1, str.length - 1)  //.replace(/(@|\/)/gm,'')
        //console.log({subs, str})
        let newStr = str.length === 1 ? this.keyStrip(str) : str.substring(1, str.length) 
        //console.log('newStr', newStr, subs)
        if(newStr.charAt(newStr.length -1) === this.tail) {
            return newStr.substring(0, newStr.length -1)
        }
        return newStr
    }

    keyStrip(str: string): string {
        return str.replace(/(@|\/)/gm,'')
    }
    
    isCRUD(context: Context): Boolean {
        let cruds = [Context.memo, Context.line]
        return cruds.indexOf(context) != -1
    }

    isSubmit(val: String): Boolean {
        var up = val.length
        return val.charAt(up -1) === this.tail 
    }

    emitter(val: Stream) {
        console.log(val)
        this.$emit('interface', val) 
        return val
    }

    processIntake(stream: Stream): string {
        if(stream.value.code) {
            let inputs = this.cursor.split(' ')
            if(inputs.length >= 2) {
                return this.cursor + stream.value.code
            }
            return this.cursor.charAt(0) + stream.value.code
        }

        return this.cursor
    }

    @Watch('actionEvent')
    onActionIndexChanged(stream: Stream, oldStream: Stream) {
        if(!stream.value) return
        this.cursor = this.processIntake(stream)
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
        this.$el.value = ''
    }

    blur() {
        //this.focused = false
    }
    
    onEntered(): boolean {
        //console.log('onEntered')
        let pre = this.cursor.charAt(0).match(new RegExp(/(@|\/)/gm,'')) 
        let chunks = this.cursor.split(' ')
        let boundary = chunks.length
        let codeCount = chunks[0].length
        let macroCheck = (chunks.length >= 2) ? chunks[1].charAt(0) === '/' : false
        let tern = (boundary >=2 || pre === null) 
        let append = tern ? this.tail : ' '
        let text = this.cursor
        //console.log('PRE', pre, append)
        let compareTail = this.tail === ' ' 
        let compareAppend = append === this.tail
        let ternCheck = (tern && !macroCheck)
        console.log({codeCount, ternCheck, compareTail, compareAppend, tern, macroCheck, boundary, append})

        //This is very important as it requeues for completion
        //space is stripped in stream
        if(macroCheck) {
            append = ' '
            text = chunks[0]  + ' ' + chunks[1].substr(1, chunks[1].length)
        }
        this.cursor = text + append
        if(macroCheck)    
            return false
        return boundary >= 2
    }

    onSubmit(isSubmit: boolean) {
        if(!isSubmit) return
        //console.log('onSubmit', isSubmit)
        this.cursor = ''
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

//[contenteditable="true"]
input.single-line {
    white-space: nowrap;
    width:200px;
    overflow: hidden;
    display:inline-block;
    vertical-align:top;
    min-height:30px;
    max-height:30px;
    max-width:90%;
    min-width:90%;
    padding:0; 
    outline:none;
    font-size:1.5rem;
    margin-left:0.75rem;
    border:none
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

