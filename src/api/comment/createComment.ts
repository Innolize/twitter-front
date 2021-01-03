import { axiosI } from "../../common/IAxios"
import { IComment } from "../../types/Comment"

interface Props {
    message: string,
    postId: string
}


export const createComment = async ({ message, postId }: Props): Promise<{ success: boolean, response?: IComment, error?: string }> => {
    try {
        const response = await (await (axiosI.post('/comment/create', { message, postId }))).data
        return { success: true, response }
    } catch (error) {
        return { success: false, error: error.response.data.message }
    }
}