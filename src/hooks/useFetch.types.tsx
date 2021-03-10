import { IComment } from "../types/Comment"
import { Post } from "../types/Post"
import { UserShort } from "../types/UserShort"

export interface IinitialState {
    successData: Post[] | Post | IComment | IComment[] | UserShort[] | null,
    errorMessage: string[],
    loading: boolean
}

export const SUCCESS = "SUCCESS"
export const ERROR = "ERROR"
export const LOADING = "LOADING"

interface successAction {
    type: typeof SUCCESS,
    payload: Post | Post[] | IComment | IComment[] | UserShort[]
}

interface errorAction {
    type: typeof ERROR,
    payload: string
}

interface loadingAction {
    type: typeof LOADING
}

export type actions = successAction | errorAction | loadingAction