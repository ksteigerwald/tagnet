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
	id: Number
    code: String
    label: String
}

export interface Memo {
	uuid: String
    id: String
    label: String
    tag_id: Number
}

export interface Line {
	uuid: String
    memo_id: Number
    label: String
    logged: String
}
