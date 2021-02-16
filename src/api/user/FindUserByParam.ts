import { axiosI } from "../../common/IAxios"
import { UserShort } from "../../types/UserShort"


export const FindUserByParam = async (searchParam: string): Promise<UserShort[] | string> => {
    try {
        const response = (await axiosI(`/user/filterUser/${searchParam}`)).data
        return response
    } catch (err) {
        return err.response.data.message
    }

}