import { axiosI } from "../../common/IAxios"

export const getUserPosts = async (userId: string) => {
    try {
        const response = (await axiosI(`/post/userPosts/${userId}`)).data
        return response
    } catch (error) {
        return error.response.message
    }
}