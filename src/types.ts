import { MutationPayload } from 'vuex'
import { TagType } from './store/tags'

// Store
export interface RootState {
    count: number
    tags: TagState
	memos: MemoState
	lines: LineState
	user: UserState
}

export interface TagState {
    tags: Tag[]
}

export interface MemoState {
    memos: Memo[]
}

export interface LineState {
    lines: Line[]
    wall: Line[]
}

export interface UserState {
	status: any
	user: any
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
    created: string
    user_id: string
}

export interface Line {
	uuid: string
    memo_id: number
    label: string
    created: string
    user_id: string
}

export interface User {
	token: string
    firstName: string
    lastName: string
    id: number
    username: string
}
