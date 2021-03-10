import { axiosI } from "../../common/IAxios"
import { IComment } from "../../types/Comment"


export const likeComment = async (commentId: string): Promise<{ success: true, data: IComment } | { success: false, error: string }> => {
    try {
        const response = (await axiosI.post(`/comment/like/${commentId}`)).data
        return { success: true, data: response }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }
}