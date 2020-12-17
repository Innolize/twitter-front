import { Dispatch } from 'react'
import { User } from '../../types/User'
import { AuthActionTypes, LOGIN, LOADING, LOGIN_ERROR, loginPayload } from '../types/AuthActionTypes'
import { InitialState } from '../reducer/authReducer'
import Axios from 'axios'

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
            await Axios.post('http://localhost:4000/user', data, { withCredentials: true })
        }
        const loggear = await (await Axios.post('http://localhost:4000/auth', data, { withCredentials: true })).data

        dispatch({ type: LOGIN, payload: loggear })
    } catch (error) {
        if (error.response) {
            let errors = error.response.data.message
            dispatch({ type: LOGIN_ERROR, payload: { errors: errors } })
        }
    }
}

