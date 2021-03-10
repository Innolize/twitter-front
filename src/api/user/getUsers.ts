import { axiosI } from "../../common/IAxios"
import { UserShort } from "../../types/UserShort"

export const getUsers = async (): Promise<UserShort[]> => {
    const response = (await axiosI('/user')).data
    return response
}