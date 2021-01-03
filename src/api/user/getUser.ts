import { axiosI } from "../../common/IAxios"

export const getUser = async (id: string) => {
    try {
        const response = (await axiosI(`/user/${id}`)).data
        return response
    } catch (err) {
        return err.response.message
    }
}