<template>
    <div class="autocomplete">
        <b-field label="Rounded">
            <b-autocomplete rounded
                v-on:input="keymapper"
				v-model="label"
                :data="data"
                icon="clipboard-list"
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

    @TagGetter tags!: Tag[]
    @MemoGetter memos!: Memo[]
    @MemoMutation addMemo: any
    
    newMemo:Memo = {
        id: short.generate(),
        label: '',
        tag: 'goal',
        type: TagType.Goal
    }
	
    @Watch('selected')
	watchSelected(newVal: string, oldVal: string) {
		console.log(newVal, oldVal)
	}
    
    keymapper(label: string){
        if(label.charAt(0) === '/') {
            this.data = this.tags.map(tag => tag.label)
        }

        if(label.charAt(0) === '@') {
            this.data = this.memos.map(memo => memo.label)
        }

		console.log(this.selected)

        return this.data.filter((option) => {
            return option
                .toString()
				.toLowerCase()
				.indexOf(this.label.toLowerCase()) >= 0
        })
    }

}
</script>
