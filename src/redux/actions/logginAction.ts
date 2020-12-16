import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, loginPayload } from '../types/AuthActionTypes'

export const login = (payload: loginPayload): AuthActionTypes => ({
    type: LOGIN,
    payload: payload
})
