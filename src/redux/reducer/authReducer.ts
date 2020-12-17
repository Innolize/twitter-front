import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, LOGIN_ERROR, LOADING } from '../types/AuthActionTypes'

const initialState = {
    user: null,
    token: null,
    errors: [],
    loading: false
}

export interface InitialState {
    user: null | User
    token: null | string
    errors: string[]
    loading: boolean
}

const authReducer = (state: InitialState = initialState, action: AuthActionTypes): InitialState => {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.payload.user, token: action.payload.access_token, loading: false }

        case LOGIN_ERROR:
            return { ...state, errors: action.payload.errors, loading: false }

        case LOADING:
            return { ...state, loading: true, errors: [], user: null }

        default:
            return state
    }
}

export default authReducer