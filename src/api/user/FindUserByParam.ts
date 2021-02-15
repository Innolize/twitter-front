import { axiosI } from "../../common/IAxios"
import { UserShort } from "../../types/UserShort"


export const FindUserByParam = async (searchParam: string): Promise<{ success: true, data: UserShort[] } | { success: false, error: string }> => {
    try {
        const response = (await axiosI(`/user/filterUser/${searchParam}`)).data
        return { success: true, data: response }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }

}