import { MutationPayload } from 'vuex'

export interface SelectProtected {
    readonly wrapperElement: HTMLDivElement;
    readonly inputElement: HTMLInputElement;
}

export const selectProtected: SelectProtected = {
    wrapperElement: document.createElement("div"),
    inputElement: document.createElement("input")
};
export interface UIFlyout {
    onSignal(direction: string):void
}
export interface ITagType {
    [key: string]: any
}
export interface IToggleType {
    [key: string]: any
}

export interface Stream {
    context: string
    event: string
    code: number
    value?: any
}
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
    id: number
    label: string
    tag_id: number
    created: string
    user_id: string
    type?: string
    MemoLines?: Line[]
    TagMemo?: Tag
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
