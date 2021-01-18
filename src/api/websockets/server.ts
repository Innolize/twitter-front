import io from 'socket.io-client'

export const createSocket = () => {
    return io('http://localhost:4001/', { 'transports': ['websocket'] })
}
