import axios from 'axios'
import { handleRefreshToken } from '../redux/actions/logginAction'
import { store } from '../redux/store'
import { User } from '../types/User'

export const axiosI = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})

axiosI.interceptors.request.use(function (config) {
    const token = store.getState().authReducer.token
    const currentToken = config.headers.Authorization
    if (token && (`Bearer ${token}` !== currentToken)) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

interface RefreshReponse {
    user: User,
    message?: string,
    access_token: string
}

axiosI.interceptors.response.use((response) => {
    return response
}, async function (err) {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
        console.log("estoy refresheando token")
        originalRequest._retry = true;
        const refreshResponse: RefreshReponse = (await axiosI.post('/auth/refresh', { withCredentials: true })).data
        store.dispatch({ type: "REFRESH_TOKEN", payload: refreshResponse.access_token })
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.access_token}`
        return axiosI(originalRequest)
    } else {
        return Promise.reject(err)
    }

})