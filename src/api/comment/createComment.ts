import { axiosI } from "../../common/IAxios"
import { IComment } from "../../types/Comment"

interface Props {
    message: string,
    postId: string
}


export const createComment = async ({ message, postId }: Props): Promise<IComment> => {
    try {
        const response = await (await (axiosI.post('/comment/create', { message, postId }))).data
        return response
    } catch (err) {
        return err.response
    }
}