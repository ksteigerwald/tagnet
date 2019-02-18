import { MutationPayload } from 'vuex'

// Store
export interface RootState {
    count: number
    tags: TagState
}

export interface TagState {
    tags: Tag[]
}

export interface Tag {
    type: string
}

