<template>
    <div>
        <b-field label="Rounded">
            <b-input placeholder="No label"
                v-model="newMemo.text"
                @keyup.native.enter="addMemo(newMemo)"
                rounded></b-input>
        </b-field>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import short from 'short-uuid';
import { State, Mutation, Getter, Action, namespace } from 'vuex-class';
import { Tag, TagState, Memo, MemoState } from '@/types'

const TagGetter = namespace('tags', Getter)

const MemoGetter = namespace('memos', Getter)
const MemoMutation = namespace('memos', Mutation)
const MemoAction = namespace('memos', Action)

@Component
export default class Tagnet extends Vue {
    @TagGetter tags!: Tag[]
    @MemoGetter memos!: Memo[]

    @MemoMutation addMemo: any
        
    newMemo:Memo = {
        id: short.generate(),
        text: '',
        tag: 'goal'
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
