import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { RootState, LineState, Line } from '../types'

type LineGetter = GetterTree<LineState, RootState> 

export const state: LineState = {
    lines: [
        { memoId: 'chFRfjc7B9pqfoJBJu8Lg', label: '1 hour of practice', logged: '2019-02-18T03:38:39.760Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 2 of Linux Academy', logged: '2019-02-18T03:43:12.337Z' },
        { memoId: 'bRnGK3kkh5ZEW2fe5VRssf', label: 'Section 3 of Linux Academy', logged: '2019-02-18T03:44:23.063Z' },
    ]
}
