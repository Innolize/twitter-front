import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"


export const getPostById = async ({ id }: any): Promise<Post | string> => {
    try {
        const response = (await axiosI.get(`/post/${id}`)).data
        return response
    } catch (err) {
        return err.response.data.message
    }
}