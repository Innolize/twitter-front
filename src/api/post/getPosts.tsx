import { axiosI } from '../../common/IAxios'
import { Post } from '../../types/Post'

export const getPosts = async (): Promise<Post[]> => {
    const respuesta = (await axiosI("/post")).data
    return respuesta
}