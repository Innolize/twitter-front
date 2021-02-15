import { axiosI } from "../../common/IAxios"

export const deletePost = async (postId: string): Promise<{ success: true, data: string } | { success: false, error: string }> => {
    try {
        const response = await axiosI.delete(`/post/delete/${postId}`)
        console.log(response.data)
        return { success: true, data: "post deleted sucessfully!" }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }
}