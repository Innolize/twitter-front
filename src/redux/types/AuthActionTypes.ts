import { User } from '../../types/User'

export const LOGIN = "LOG_IN"
export const LOGOUT = "LOG_OUT"

export type loginPayload = {
    user: User
    access_token: string
}

interface Loggin {
    type: typeof LOGIN
    payload: loginPayload
}

// interface Logout {
//     type: typeof LOGOUT
//     payload: User
// }

// | Logout

export type AuthActionTypes = Loggin