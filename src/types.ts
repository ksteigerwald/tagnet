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

export enum Context {
    memo = 'memo',
    line = 'line',
    create = 'create',
    search = 'search',
    append = 'append',
    flyout = 'flyout',
    open = 'open',
    toggle = 'toggle',
}

export enum Event {
    create = 'create',
    add = 'add',
    append = 'append',
    search = 'search',
    up = 'up',
    app = 'app',
    down = 'down',
    enter = 'enter',
    click = 'click',
    drop = 'drop',
    error = 'error'
}

export interface Format {
    id: number 
    type: string
}

export interface Stream {
    context: Context
    event: Event
    value?: any
}

export interface Macro {
    id: number 
    label: string
    desc: string
    code: string
}

// Store
export interface RootState {
    count: number
    tags: TagState
    memos: MemoState
    lines: LineState
    user: UserState
}

export interface StreamState {
    streams: Stream[]
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

export interface MacroState {
    macros: Macro[]
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
    code: string
    autogen?: boolean
    type?: string
    MemoLines?: Line[]
    TagMemo?: Tag

}

export interface Line {
    id: number
	uuid: string
    memo_id: number
    label: string
    created: string
    user_id: string
    code:string
    format_id?:number
}

export interface User {
	token: string
    firstName: string
    lastName: string
    id: number
    username: string
}

