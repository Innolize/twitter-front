import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"

export const getUserPosts = async (userId: string): Promise<Post[] | string> => {
        const response = (await axiosI(`/post/userPosts/${userId}`)).data
        console.log(response)
        return response

}