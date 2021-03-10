import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"

export const getPostByFollow = async (): Promise<Post[] | string> => {
    try {
        const response = (await axiosI('/post/follows')).data
        return response
    } catch (err) {
        return err.response.data.message
    }
}
