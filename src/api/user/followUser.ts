import { axiosI } from "../../common/IAxios"

export const followUser = async (userId: string) => {
    try {
        const response = (await axiosI.post(`/user/follow/${userId}`)).data
        return response
    } catch (err) {
        console.log(err)
    }
}