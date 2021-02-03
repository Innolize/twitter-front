import { axiosI } from "../../common/IAxios"

export const getFollowUser = async () => {
    try {
        const response = (await axiosI('user/follow')).data
        return response
    } catch (err) {
        console.log(err)
    }
}