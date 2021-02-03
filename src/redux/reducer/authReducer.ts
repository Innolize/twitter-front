import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, LOGIN_ERROR, LOADING, LOG_OUT, USER_EDITED, REFRESH_TOKEN, USER_FOLLOW_EDITED } from '../types/AuthActionTypes'

export const initialState = {
    user: null,
    token: null,
    errors: [],
    loading: false,
    logged: null
}

export interface InitialState {
    user: null | User
    token: null | string
    errors: string[]
    loading: boolean,
    logged: boolean | null
}

const authReducer = (state: InitialState = initialState, action: AuthActionTypes): InitialState => {
    switch (action.type) {
        case LOGIN:
            console.log('login')
            return { ...state, user: action.payload.user, token: action.payload.access_token, loading: false, logged: true }

        case USER_EDITED:
            console.log('user edited')
            return { ...state, user: action.payload }

        case USER_FOLLOW_EDITED:
            console.log('user edited')
            return { ...state, user: Object.assign(state.user,action.payload) }

        case LOGIN_ERROR:
            console.log('not logged')
            return { ...state, errors: action.payload.errors, loading: false, logged: false }

        case LOADING:
            console.log('loading')
            return { ...state, loading: true, errors: [], user: null }

        case LOG_OUT:
            console.log('logged out')
            return { ...state, loading: false, errors: [], user: null, logged: false }

        case REFRESH_TOKEN:
            console.log("refresh token")
            return { ...state, token: action.payload }

        default:
            return state
    }
}

export default authReducer