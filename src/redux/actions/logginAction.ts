import { Dispatch } from 'react'
import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, LOADING, LOGIN_ERROR, loginPayload } from '../types/AuthActionTypes'
import { InitialState } from '../reducer/authReducer'
import { axiosI } from '../../common/IAxios'

interface logInfo {
    email: string
    password: string
    name?: string
    surname?: string
}

interface NewAccount {
    new: boolean
}

export const login = (data: logInfo, newAccount?: NewAccount) => async (dispatch: Dispatch<AuthActionTypes>, getState: () => InitialState) => {
    try {
        dispatch({ type: LOADING })

        if (newAccount) {
            await axiosI.post('/user', data, { withCredentials: true })
        }
        const loggear = (await axiosI.post('/auth', data, { withCredentials: true })).data

        dispatch({ type: LOGIN, payload: loggear })
    } catch (error) {
        if (error.response) {
            let errors = error.response.data.message
            dispatch({ type: LOGIN_ERROR, payload: { errors: errors } })
        }
    }
}

interface RefreshReponse {
    user: User,
    message?: string,
    access_token: string
}

export const handleRefreshToken = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    console.log('entre al handleRefreshToken')
    try {
        dispatch({ type: LOADING })
        const loggear: RefreshReponse = (await axiosI.post('/auth/refresh', { withCredentials: true })).data
        if (loggear.access_token) {
            dispatch({ type: LOGIN, payload: { user: loggear.user, access_token: loggear.access_token } })
        } else {
            dispatch({ type: LOGIN_ERROR, payload: { errors: [loggear.message ? loggear.message : 'loggin error'] } })
        }
    } catch (err) {
        dispatch({ type: LOGIN_ERROR, payload: { errors: ["error "] } })
    }

}