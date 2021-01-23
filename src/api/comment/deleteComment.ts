import { axiosI } from "../../common/IAxios"

interface deleteCommentI {
    success: boolean,
    message: string
}

export const deleteComment = async (id: string): Promise<deleteCommentI> => {
    try {
        const response = (await axiosI.delete(`/comment/delete/${id}`)).data
        console.log(response)
        return { success: true, message: 'comment deleted successfully!' }
    } catch (err) {
        console.log(err.response.data)
        return { success: false, message: err.response.data.message }
    }

}