import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"

export const createPost = async (message: string): Promise<{ success: true, data: Post } | { success: false, error: string }> => {
    try {
        const response = (await axiosI.post('/post/create', { message })).data
        return { success: true, data: response }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }
}