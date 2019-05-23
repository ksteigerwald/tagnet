<template>
    <div class="wrap column is-half">
        <div class="rx-complete">
            
            <ActionToggle 
			    v-bind:index="actionToggleIndex"
			    @clickActionToggle="onActionToggleClick"/>

            <textarea 
             :placeholder="output"
             type="text" 
             v-model="tagnet" 
             id="stream"
             autocomplete="off"
             @keydown.down="onArrowDown"
             @keydown.up="onArrowUp"
             @keydown.enter="onEnter"> </textarea>

            <ul class="ac-results">
                <li 
                v-for="(match, i) in matches"
                :key="i"
                :class="{ 'is-active': i === arrowCounter }"
                @click="onClick(i)">
                    <a href="#">{{match.label}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import short from 'short-uuid';
import { State, Mutation, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'
import { Subject, fromEvent, of, pipe } from 'rxjs';
import { pluck, map, debounceTime, tap,
    distinctUntilChanged, switchMap } from 'rxjs/operators';

import ActionToggle from '@/components/ActionToggle.vue'

@Component<RxTagnet>({

    components: {
        ActionToggle
    }, 

    subscriptions() {
        return ({
            matches: this.$watchAsObservable('tagnet').pipe(
                debounceTime(200),
                pluck('newValue'),
                distinctUntilChanged(),
                switchMap(this.streamSwitch),
            )
        });
    },

    created() {
        this.subscription = this.queue.get().subscribe( (message: any) => {
            this.tagnet = ''
            this.matches = []
            this.arrowCounter = 0
            let obj = message.payload

            if(obj.__typename !== 'line') {
                this.stack.push(obj)
            }
            else {
                var action = this.stack.pop() || { __typename: 'search' }
                switch(action.__typename) {
                    case "tags":
                        let memo: Memo = { uuid: '', id: 0, 
                            created: '', user_id: '', label: obj.label, 
                            tag_id: action.id 
                        } 

                        this.createMemo(memo)
                        break
                    case "memos":
                        let line: Line = { 
                            uuid: '', created: '', user_id: '', 
                            memo_id: action.id, label: obj.label } 

                        this.createLine(line)
                        break
                    default:
                        this.searchMemos(obj.label)
                        break
                }
            }

            this.output = obj.label 
        })
    },

    beforeDestroy() {
        this.subscription.unsubscribe();
    }

})

export default class RxTagnet extends Vue { 

    tagnet:any = '' 
    output:string = 'What are you looking for?'
	actionToggleIndex: number = 2
    arrowCounter: number = 0
    subject:Subject<any> = new Subject()
    stack:any[] = []
    matches:any[] = []
    results:any[] = []

    subscription: any
    queue:any = {
        send: (message: any) => this.subject.next({ payload: message }),
        clear: () => this.subject.next(),
        get: () => this.subject.asObservable()
    };

    @Getter('tags/tags') tags!: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('memos/newMemo') newMemo: Memo
    @Action('memos/createMemo') createMemo: any
    @Action('lines/createLine') createLine: any
    @Action('memos/searchMemos') searchMemos: any
    
    onActionToggleClick(value:any) {
        switch(value) {
            case 'create':
                this.tagnet = '/'
                //this.matches = this.tags
                break
            case 'find':
                this.tagnet = '@'
                //this.matches = this.memos
                break
            default:
                this.matches = []
                break
        }
    }

    onArrowDown() {
        if(!this.matches) return
        if (this.arrowCounter < this.matches.length - 1) {
            this.arrowCounter = this.arrowCounter + 1;
        }
    }

    onArrowUp() {
        if (this.arrowCounter > 0) {
            this.arrowCounter = this.arrowCounter - 1;
        }
    }

    onClick(i: number) {
        let packet = this.matches[i]
        this.queue.send(packet)
    }

    onEnter(input: any) {
        let packet = this.matches[this.arrowCounter]
        if(packet)
            this.queue.send(packet)
        if(this.tagnet != '' && this.tagnet.length > 2)
            this.queue.send({__typename: 'line', label: this.tagnet })

    }

    filterTags(keys: any) {
        return this.tags.filter( e => { 
            let c = e.label.slice(0, keys.length - 1).toLowerCase()
            let k = keys.slice(1, keys.length).toLowerCase()
            return c === k
        })
    }

    filterMemos(keys: any) {
        return this.memos.filter( e => { 
            let c = e.label.slice(0, keys.length-1).toLowerCase()
            let k = keys.slice(1, keys.length).toLowerCase()
            return c === k
        })
    }

    streamSwitch(keys: any) {
        if(keys.charAt(0) === '/') 
            return of(this.filterTags(keys))
        if(keys.charAt(0) === '@') 
            return of(this.filterMemos(keys)) 
        return of([])
    }
}
</script>


<style scoped lang="scss">
.wrap {
    position:relative;
}
.rx-complete {
    position:absolute;
    z-index:10;
    width:100%;
    padding:0 5px;
    span.cursor {
        position:relative;
        z-index:-1;
    }
    textarea {
        background-color: transparent;
        outline: none;
        border: none;
        width:90%;
        height:25px;
        font-size:1.25rem;
        font-weight:300;
        margin:0 .5rem;
    }

    *:focus {
        outline:none
    }

    ul {
        margin-top:1.5rem;
        border-top:1px solid #7957d5;
        display:block;
        li {
            display:block;
            text-align:left;
        }
        li.is-active,
        li:hover {
            border-bottom:1px solid ;
            color: white;
        }
    }
}
</style>

