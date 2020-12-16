import { User } from '../../types/User'
import { AuthActionTypes, LOGIN } from '../types/AuthActionTypes'

const initialState: InitialState = {
    user: null,
    token: null,
}

interface InitialState {
    user: null | User
    token: null | string
}

const authReducer = (state = initialState, { type, payload }: AuthActionTypes): InitialState => {
    switch (type) {

        case LOGIN:
            return { ...state, user: payload.user, token: payload.access_token }

        default:
            return state
    }
}

export default authReducer