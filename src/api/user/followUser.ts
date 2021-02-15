import { axiosI } from "../../common/IAxios"

interface Response {
    followersArr: string[]
    followrsNumb: number
}

export const followUser = async (userId: string): Promise<Response | { success: false, error: string }> => {
    try {
        const response = (await axiosI.post(`/user/follow/${userId}`)).data
        return response
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }
}