import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"

export const createPost = async (message: string): Promise<{ success: boolean, response?: Post, error?: string }> => {
    try {
        const response = (await axiosI.post('/post/create', { message })).data
        return { success: true, response }
    } catch (err) {
        if (err) {
            return { success: false, error: err.response.data.message }
        } else {
            return { success: false, error: "this error should never happend" }
        }
    }
}