import { axiosI } from '../../common/IAxios'

export const getPosts = async () => {
    try {
        const respuesta = await axiosI("http://localhost:4000/post")
        return respuesta.data
    } catch (err) {
        return err
    }
}