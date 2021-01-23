import { axiosI } from "../../common/IAxios"


export const likeComment = async (commentId: string): Promise<Boolean> => {
    try {
        const response = (await axiosI.post(`/comment/like/${commentId}`)).data
        return response
    } catch (err) {
        return false
    }
}