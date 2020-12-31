import axios from 'axios'
import { store } from '../redux/store'

export const axiosI = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})

axiosI.interceptors.request.use(function (config) {
    const token = store.getState().authReducer.token
    const currentToken = config.headers.Authorization
    if (token && (`Bearer ${token}` !== currentToken)) {
        console.log('entre')
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})