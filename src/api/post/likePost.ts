import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"


export const likePost = async (postId: string): Promise<Post> => {
    const response = (await axiosI.post(`/post/like/${postId}`)).data
    return response
}