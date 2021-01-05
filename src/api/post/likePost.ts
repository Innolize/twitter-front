import { axiosI } from "../../common/IAxios"


export const likePost = async (postId: string): Promise<Boolean> => {
    try {
        const response = (await axiosI.post(`/post/like/${postId}`)).data
        return response
    } catch (err) {
        return false
    }
}