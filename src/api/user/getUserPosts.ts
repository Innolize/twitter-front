import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"

export const getUserPosts = async (userId: string): Promise<Post[] | string> => {
    try {
        const response = (await axiosI(`/post/userPosts/${userId}`)).data
        return response
    } catch (error) {
        return error.response.message
    }
}