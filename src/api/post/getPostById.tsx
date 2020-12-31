import { axiosI } from "../../common/IAxios"


export const getPostById = async ({ id }: any) => {
    try {
        const response = (await axiosI.get(`/post/${id}`)).data
        return response
    } catch (error) {
        return error.response.data
    }
}