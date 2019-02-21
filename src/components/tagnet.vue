<template>
    <div class="autocomplete">
        <b-field label="Rounded">
            <b-autocomplete rounded
                v-on:input="keymapper"
				v-model="label"
                :data="data"
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
import { Tag, TagState, Memo, MemoState } from '@/types'
import { TagType } from '@/store/tags'

const TagGetter = namespace('tags', Getter)

const MemoGetter = namespace('memos', Getter)
const MemoMutation = namespace('memos', Mutation)
const MemoAction = namespace('memos', Action)

@Component
export default class Tagnet extends Vue {
    data: any[] = []
	label: string = ''
    selected: any = null
    actionType: any = null

    icon:string = "search"

    @TagGetter tags!: Tag[]
    @MemoGetter memos!: Memo[]
    @MemoMutation addMemo: any
    
	
    @Watch('selected')
	watchSelected(newVal: string, oldVal: string) {
        if(!newVal) return
        let obj = this.matchKind(newVal)
        this.actionType = obj[0]
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
        let newClass = isLine ? 'clipboard' : TagType[icon]
        let css: string = $el.classList.value.replace(this.icon, newClass)
        $el.className = css
        this.icon = newClass
    }
   
    private newMemo(label: String): Memo {
        return {
            id: short.generate(),
            label: label,
            tag: 'goal',
            type: this.actionType
        } 
    }
    keyEvent(val: String) {
        if(!val) return
        this.label = ''
        let memo: Memo = this.newMemo(val)
        this.addMemo(memo) 
    }
    
    keymapper(label: string){
        if(label === null) return true

        if(label.charAt(0) === '/') {
            this.data = this.tags.map(tag => tag.label)
        }

        if(label.charAt(0) === '@') {
            this.data = this.memos.map(memo => memo.label)
        }

        return this.data.filter((option) => {
            return option
                .toString()
				.toLowerCase()
				.indexOf(this.label.toLowerCase()) >= 0
        })
    }

}
</script>
