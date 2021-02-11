import { axiosI } from "../../common/IAxios"


export const FindUserByParam = async (searchParam: string) => {
    const response = (await axiosI(`/user/filterUser/${searchParam}`)).data
    return response
}