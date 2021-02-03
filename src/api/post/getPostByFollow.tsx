import { axiosI } from "../../common/IAxios"

export const getPostByFollow = async () => {
    try {
        const response = (await axiosI('/post/follows')).data
        return response
    } catch (err) {
        console.log("error: ", err)
    }

}
