import { axiosI } from "../../common/IAxios"

interface deletePostI {
    success: boolean,
    message: string
}

export const deletePost = async (postId: string): Promise<deletePostI> => {
    try {
        const response = await axiosI.delete(`/post/delete/${postId}`)
        console.log(response.data)
        return { success: true, message: "post deleted sucessfully!" }
    } catch (err) {
        return { success: false, message: err.response.data.message }
    }
}