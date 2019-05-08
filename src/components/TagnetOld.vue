<template>
    <div class="autocomplete">
        <b-field :label="output">
            <b-autocomplete rounded
                v-on:input="keymapper"
				v-model="label"
                :data="filterData"
                clear-on-select
                icon="search"
                @keyup.native.enter="keyEvent(label)"
				@select="option => selected = option"
                placeholder="e.g. Anne">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import short from 'short-uuid';
import { State, Mutation, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState, Line, LineState } from '@/types'
import { TagType } from '@/store/tags'

const uuidv1 = require('uuid/v1');

@Component
export default class TagnetOld extends Vue {
    data: any[] = []
    label: string = ''
    selected: any = null
    actionType: any = null
    output: string = 'Start Typing'
    icon:string = "search"

    @Getter('tags/tags') tags!: Tag[]
    @Getter('memos/memos') memos!: Memo[]
    @Mutation('memos/addMemo') addMemo: any
    @Getter('lines/lines') lines!: Line[]
    @Mutation('lines/addLine') addLine: any

    @Action('memos/createMemo') createMemo: any
    @Action('lines/createLine') createLine: any
    @Action('lines/searchLines') searchLines: any


    @Watch('selected')
	watchSelected(newVal: string, oldVal: string) {
        if(!newVal) return
        let obj = this.matchKind(newVal)
        this.actionType = obj[0]
        this.output = this.actionType.label
	}
   
    private matchKind(val: string) {
        let tagit: Tag[] = this.tags.filter(tag => tag.label === val)

        let memoit = this.memos.filter(memo => memo.label === val)
        let isMemo = memoit.length > 0
        this.swapIcon(val, isMemo)

        return isMemo ? memoit : tagit
    }

    private swapIcon(icon: string, isLine: boolean) {
        let str: string = 'fa-' + this.icon 
        let $el: any = document.getElementsByClassName(str)[0]
        let newClass = isLine ? 'clipboard' : (<any>TagType)[icon]
        let css: string = $el.classList.value.replace(this.icon, newClass)
        $el.className = css
        this.icon = newClass
    }
   
    private newMemo(label: string): Memo {
        return {
            uuid: '',
            id: '',
            created: '',
            user_id: '',
            label: label,
            tag_id: this.actionType.id
        } 
    }

    private newLine(label: string): Line {
        return {
            uuid: '',
            created: '',
            user_id: '',
            memo_id: this.actionType.id,
            label: label,
        } 
    }

    keyEvent(val: string) {
        if(!this.actionType) {
            console.log(val, 'search')
			//perform search
			this.searchLines(val)
			return
		}

		if(val.trim() === '') return


        this.label = '';
        if(Object.keys(this.actionType).indexOf('code') != -1) {
            console.log(val, 'search')
            if(val.charAt(0) === '/') return
            let memo: Memo = this.newMemo(val)
            this.createMemo(memo) 
            return
        }

        let line: Line = this.newLine(val)
        this.createLine(line)
    }
    
    keymapper(label: string){
        if(label === null) return 

        if(label.length === 1 && label.charAt(0) === '/') {
            this.data = this.tags.map(tag => tag.label)
        }

        if(label.length === 1 && label.charAt(0) === '@') {
            this.data = this.memos.map(memo => memo.label)
        }

        if(!this.actionType) {
			//perform search
			this.searchLines(label)
			return
		}
    }

    get filterData() {
        let len = this.label.length
        let token: String = this.label.substring(1,len).toLowerCase();
        return this.data.filter((option) => {
            return option
                .toString()
				.toLowerCase()
				.indexOf(token) >= 0
        })
    }
}
</script>

