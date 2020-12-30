import axios from 'axios'
import { store } from '../redux/store'

export const axiosI = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})

axios.interceptors.request.use(function (config) {
    const token = store.getState().authReducer.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})