import { axiosI } from "../../common/IAxios"

export interface EditUser {
    name?: string
    surname?: string
    bio?: string
    profilePicture?: File
    cover?: File
}

export const updateUser = async (id: string, data: any) => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const response = (await axiosI.put(`/user/${id}`, data, config)).data
        return response
    } catch (error) {
        if (error) {
            console.log(error.response)
        }
    }
}