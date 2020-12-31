import axios from 'axios'

export const getPosts = async () => {
    try {
        const respuesta = await axios("http://localhost:4000/post")
        return respuesta.data
    } catch (err) {
        return err
    }
}