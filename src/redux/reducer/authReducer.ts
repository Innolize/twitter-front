import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, LOGIN_ERROR, LOADING, LOG_OUT, USER_EDITED, REFRESH_TOKEN, USER_FOLLOW_EDITED, SET_ERROR, SET_SUCCESS } from '../types/AuthActionTypes'

export const initialState = {
    user: null,
    token: null,
    errorsMessage: "",
    successMessage: "",
    loading: false,
    logged: null
}

export interface InitialState {
    user: null | User
    token: null | string
    errorsMessage: string
    successMessage: string
    loading: boolean
    logged: boolean | null
}

const authReducer = (state: InitialState = initialState, action: AuthActionTypes): InitialState => {
    switch (action.type) {
        case LOGIN:
            console.log('login')
            return { ...state, errorsMessage: "", user: action.payload.user, token: action.payload.access_token, loading: false, logged: true, }

        case USER_EDITED:
            console.log('user edited')
            return { ...state, user: action.payload }

        case USER_FOLLOW_EDITED:
            console.log('user edited')
            return { ...state, user: Object.assign(state.user, action.payload) }

        case LOGIN_ERROR:
            console.log('not logged')
            return { ...state, errorsMessage: action.payload.error, loading: false, logged: false }

        case LOADING:
            console.log('loading')
            return { ...state, loading: true, errorsMessage: "", user: null }

        case SET_ERROR:
            console.log('error setted')
            return { ...state, errorsMessage: action.payload }

        case SET_SUCCESS:
            console.log('error setted')
            return { ...state, successMessage: action.payload }

        case LOG_OUT:
            console.log('logged out')
            return { ...state, loading: false, errorsMessage: "", user: null, logged: false }

        case REFRESH_TOKEN:
            console.log("refresh token")
            return { ...state, token: action.payload }

        default:
            return state
    }
}

export default authReducer