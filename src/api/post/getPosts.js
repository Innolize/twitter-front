import { axiosI } from '../../common/IAxios'

export const getPosts = async () => {
    try {
        const respuesta = await axiosI("/post")
        return respuesta.data
    } catch (err) {
        return err
    }
}