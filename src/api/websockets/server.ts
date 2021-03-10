import io from 'socket.io-client'

export const createSocket = () => {
    const URL = process.env.REACT_APP_BACKEND_URL as string
    return io(URL, { 'transports': ['websocket'] })
    //  
}
