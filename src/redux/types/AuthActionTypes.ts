import { User } from '../../types/User'

export const LOGIN = "LOGIN"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOADING = "LOADING"
export const LOG_OUT = "LOG_OUT"
export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const USER_EDITED = "USER_EDITED"
export const USER_FOLLOW_EDITED = "USER_FOLLOW_EDITED"
export const REMOVE_ERROR = "REMOVE_ERROR"
export const SET_ERROR = "SET_ERROR"
export const SET_SUCCESS = "SET_SUCCESS"

interface removeError {
    type: typeof REMOVE_ERROR
}

export type loginPayload = {
    user: User
    access_token: string
}

type loginErrorPayload = {
    error: string
}

interface Refresh {
    type: typeof REFRESH_TOKEN
    payload: string
}

interface Login {
    type: typeof LOGIN
    payload: loginPayload
}

interface LoginError {
    type: typeof LOGIN_ERROR
    payload: loginErrorPayload
}

interface LoadingUser {
    type: typeof LOADING
}

interface LogOut {
    type: typeof LOG_OUT
}

interface UserEdited {
    type: typeof USER_EDITED
    payload: User
}

type userFollowEditedPayload = {
    followArr: string[],
    followNumb: number
}

interface userFollowEdited {
    type: typeof USER_FOLLOW_EDITED
    payload: userFollowEditedPayload
}

interface SetError {
    type: typeof SET_ERROR
    payload: string
}

interface SetSuccess {
    type: typeof SET_SUCCESS
    payload: string
}


export type AuthActionTypes = Login | LoginError | LoadingUser | LogOut | Refresh | UserEdited | userFollowEdited | removeError | SetError | SetSuccess