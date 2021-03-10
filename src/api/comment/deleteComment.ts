import { axiosI } from "../../common/IAxios"

export const deleteComment = async (id: string): Promise<{ success: true, data: string } | { success: false, error: string }> => {
    try {
        await axiosI.delete(`/comment/delete/${id}`)
        return { success: true, data: 'comment deleted successfully!' }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }

}