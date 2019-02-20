import { MutationPayload } from 'vuex'
import { TagType } from './store/tags'
// Store
export interface RootState {
    count: number
    tags: TagState
}

export interface TagState {
    tags: Tag[]
}

export interface MemoState {
    memos: Memo[]
}

export interface LineState {
    lines: Line[]
}

export interface Tag {
    code: string
    label: string
}

export interface Memo {
    type: TagType
    id: String
    label: String
    tag: String //should this be [] allow for say goal,work || goal,personal
}

export interface Line {
    memoId: String
    label: String
    logged: String
}
