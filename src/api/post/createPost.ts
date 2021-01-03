import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"


export const createPost = async (message: string): Promise<{ success: boolean, response?: Post, error?: string }> => {
    try {
        const response = await (await axiosI.post('/post/create', { message })).data
        return { success: true, response }
    } catch (error) {
        return { success: false, error: error.response.data.message }
    }
}