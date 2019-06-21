import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Getter, Action, namespace,  } from 'vuex-class';
import anchorme from "anchorme";
import { globalEventBus } from '@/helpers/EventBus'

import { Context, Event, Stream, Tag, TagState, Memo, 
        MemoState, Line, LineState, MacroState, Macro } from '../types'
import { dispatch } from 'rxjs/internal/observable/range';
import { format } from 'path';

// You can declare a mixin as the same style as components.
@Component
export default class CRUDMixIn extends Vue {

    @Action('tags/loadTags') loadTags: any
    @Action('memos/loadMemos') loadMemos: any
    @Action('lines/loadLines') loadLines: any
    @Action('lines/updateLineCode') updateLineCode: any
    @Getter('tags/tags') tags!: Tag[]
    @Getter('tags/findByCode') findTagByCode: any
    @Getter('memos/findByCode') findMemoByCode: any

    @Getter('memos/findImgAny') findImgAny: Memo[]

    @Getter('tags/filterTags') filterTags: (keys: any) => any[]
    @Getter('memos/filterMemos') filterMemos: (keys: any) => any[]
    @Getter('macros/filterMacros') filterMacros: (keys: any) => any[]
    @Getter('memos/memos') memos!: Memo[]
    @Getter('lines/lines') lines!: Line[]
    @Action('memos/createMemo') createMemo: any
    @Action('lines/createLine') createLine: any
    @Action('memos/searchMemos') searchMemos: any
    
    intakeData: any[] = []

    get syncData():any[] {
        return this.intakeData
    }

    beforeMount() {
        var random = Math.random(); 
        let appeared:any[] = []
        globalEventBus.$on('emitInterface', (data: Stream) => {
            console.log(`%c globalEventsOn ${random}`, 'background: #222; color: #bada55');
            if(appeared.indexOf(data) === -1)
                appeared.push(data)
                this.onInterfaceChange(data)
        })
    }

    keygen(stream: Stream): string {
        return stream.context + '-' + stream.event
    }

    process(str: string): any {
        let data = str.split(' ') 
        let code = data.shift()
        let isMacro = this.filterMacros(data[0]).length > 0
        let formatId = isMacro ? 3 : 1
        let meta = null

        if(isMacro) {
            data.shift()
            meta = { meta: { checked: "0" } }
        } 

        let processed = anchorme(data.join(' '))
        let obj = Object.assign({ code: code, value: processed, format_id: formatId }, meta)
        console.log("OBJ>>.", obj, meta)
        return obj
    }

    async onInterfaceChange(stream:Stream) {
        console.log(this.keygen(stream), 'HOME PAGE - onInterfaceChange')

        switch (this.keygen(stream)) {
            case 'create-open':
                this.intakeData = this.filterTags(stream.value)            
                break
            case 'memo-add':
                this.intakeData = this.filterTags(stream.value)            
                break
            case 'memo-drop':
                //var obj = this.process(stream.value)
                var dropMemo: Memo[] = (stream.value.code) ? 
                    this.memos.filter(memo => memo.code === stream.value.code) :
                    this.memos.filter(memo => memo.tag_id === 7 && memo.autogen === true)

                if(dropMemo.length === 0) {
                    await this.createMemo({
                            label: 'Your Image Bucket',
                            tag_id: 7,
                            autogen: true })
                    var dropMemo: Memo[] = this.memos.filter(memo => memo.tag_id === 7 && memo.autogen === true)
                }
                else {
                    let memoId = dropMemo[0].id
                    let newLine: Stream = {
                        context: Context.line,
                        event: Event.drop,
                        value: {
                            memo_id: memoId,
                            format_id: 2,
                            label: stream.value.filename
                        }
                    }

                    this.onInterfaceChange(newLine)
                }
                break
            case 'memo-create':
                var obj = this.process(stream.value)
                var tag = this.findTagByCode(obj.code).pop()
                this.createMemo({
                    label: obj.value,
                    tag_id: tag.id
                })
                break
            case 'line-macro':
                let macroSearch: string = stream.value.split('/').pop()
                this.intakeData = this.filterMacros(macroSearch)
                break
            case 'line-add':
                this.intakeData = this.filterMemos(stream.value)            
                break
            case 'line-create':

                var obj:any = this.process(stream.value)
                var memo:Memo = this.findMemoByCode(obj.code).pop()
            console.log('META', obj.meta, obj)
                this.createLine({
                    label: obj.value,
                    memo_id: memo.id,
                    format_id: obj.format_id,
                    meta: obj.meta
                })
                break
            case 'line-drop':
                let lines = this.lines.filter(line => line.label == stream.value.label)
                
                if(lines.length === 0)
                    this.createLine(stream.value)
                    this.$store.dispatch('memos/loadMemos')
                break
            case 'open-enter':
                this.searchMemos(stream.value)
                break
            case 'flyout-click':
                console.log('CLICK FLYOUT', stream.value)
                this.intakeData = []
                //this.intakeData = this.searchMemos(stream.value)
                break
            default:
                this.intakeData = []
                break
        }

    }
}