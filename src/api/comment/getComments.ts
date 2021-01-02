import { axiosI } from "../../common/IAxios"
import { IComment } from "../../types/Comment"

interface Props {
    postId: string
}

export const getComments = async ({ postId }: Props): Promise<IComment[]> => {
    console.log(postId)
    try {
        const response = await (await (axiosI.get(`/comment/post/${postId}`))).data
        console.log(response)
        return response
    } catch (err) {
        return err.response
    }
}