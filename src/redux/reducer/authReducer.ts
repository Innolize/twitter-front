import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, LOGIN_ERROR, LOADING, LOG_OUT } from '../types/AuthActionTypes'

const initialState = {
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

        case LOGIN_ERROR:
            console.log('not logged')
            return { ...state, errors: action.payload.errors, loading: false }

        case LOADING:
            console.log('loading')
            return { ...state, loading: true, errors: [], user: null }

        case LOG_OUT:
            console.log('logged out')
            return { ...state, loading: false, errors: [], user: null, logged: false }

        default:
            return state
    }
}

export default authReducer