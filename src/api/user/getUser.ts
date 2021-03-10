import { axiosI } from "../../common/IAxios"
import { User } from '../../types/User'

export const getUser = async (id: string): Promise<User | string> => {
    try {
        const response = (await axiosI(`/user/${id}`)).data
        return response
    } catch (err) {
        return err.response.message
    }
}