import { axiosI } from "../../common/IAxios"
import { Post } from "../../types/Post"


export const getPostById = async ({ id }: any): Promise<{ success: true, data: Post } | { success: false, error: string }> => {
    try {
        const response = (await axiosI.get(`/post/${id}`)).data
        return { success: true, data: response }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }
}