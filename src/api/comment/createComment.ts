import { axiosI } from "../../common/IAxios"
import { IComment } from "../../types/Comment"

interface Props {
    message: string,
    postId: string
}


export const createComment = async ({ message, postId }: Props): Promise<{ success: true, data: IComment } | { success: false, error: string }> => {
    try {
        const response = (await (axiosI.post('/comment/create', { message, postId }))).data
        return { success: true, data: response }
    } catch (err) {
        console.log(err.response)
        return { success: false, error: err.response.data.message }
    }
}