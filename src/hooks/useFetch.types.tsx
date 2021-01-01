import { Post } from "../types/Post"

export interface IinitialState {
    successData: Post[] | Post,
    errorMessage: string[],
    loading: boolean
}

export const SUCCESS = "SUCCESS"
export const ERROR = "ERROR"
export const LOADING = "LOADING"

interface successAction {
    type: typeof SUCCESS,
    payload: Post | Post[]
}

interface errorAction {
    type: typeof ERROR,
    payload: string
}

interface loadingAction {
    type: typeof LOADING
}

export type actions = successAction | errorAction | loadingAction