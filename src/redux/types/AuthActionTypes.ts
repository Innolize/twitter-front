import { User } from '../../types/User'

export const LOGIN = "LOGIN"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOADING = "LOADING"
export const LOG_OUT = "LOG_OUT"
export const USE_REFRESH_TOKEN = "USE_REFRESH_TOKEN"

export type loginPayload = {
    user: User
    access_token: string
}

type loginErrorPayload = {
    errors: string[]
}

interface Refresh {
    type: typeof USE_REFRESH_TOKEN
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


export type AuthActionTypes = Login | LoginError | LoadingUser | LogOut | Refresh