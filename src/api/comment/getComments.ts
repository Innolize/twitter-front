import { axiosI } from "../../common/IAxios"
import { IComment } from "../../types/Comment"

interface Props {
    postId: string
}

export const getComments = async (postId: Props): Promise<IComment[]> => {
    try {
        const response = (await (axiosI.get(`/comment/post/${postId}`))).data
        return response
    } catch (err) {
        return err.response
    }
}