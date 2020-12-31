import { axiosI } from "../../common/IAxios"


export const createPost = async (message: string) => {
    try {
        const response = await (await axiosI.post('/post/create', { message })).data
        return { success: true, response }
    } catch (error) {
        return { success: false, response: error.response.data.message }
    }
}