import { axiosI } from "../../common/IAxios"
import { User } from "../../types/User"

export interface EditUser {
    name?: string
    surname?: string
    bio?: string
    profilePicture?: File
    cover?: File
}

export const updateUser = async (id: string, data: any): Promise<{ success: true, data: User } | { success: false, error: any }> => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const response = (await axiosI.put(`/user/${id}`, data, config)).data
        return { success: true, data: response }
    } catch (err) {
        return { success: false, error: err.response.data.message }
    }
}