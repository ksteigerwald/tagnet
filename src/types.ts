import { MutationPayload } from 'vuex'

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
    type: string
}

export interface Memo {
    id: String
    text: String
    tag: String //should this be [] allow for say goal,work || goal,personal
}

export interface Line {
    memoId: String
    text: String
    logged: String
}
