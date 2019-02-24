import { MutationPayload } from 'vuex'
import { TagType } from './store/tags'

// Store
export interface RootState {
    count: number
    tags: TagState
	memos: MemoState
	lines: LineState
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
	id: number
    code: string
    label: string
}

export interface Memo {
	uuid: string
    id: string
    label: string
    tag_id: number
}

export interface Line {
	uuid: string
    memo_id: number
    label: string
    logged: any
}
