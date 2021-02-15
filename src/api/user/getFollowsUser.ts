import { axiosI } from "../../common/IAxios"
import { UserShort } from "../../types/UserShort"

export const getFollowUser = async (): Promise<UserShort | string> => {
    try {
        const response = (await axiosI('user/follow')).data
        return response
    } catch (err) {
        return err.response.data.message
    }
}