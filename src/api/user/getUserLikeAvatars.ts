import { axiosI } from '../../common/IAxios'
import { UserShort } from '../../types/UserShort'

export const getUserLikeAvatars = async (idArray: string[]): Promise<UserShort[]> => {
    const promisesArray = idArray.map(async (userId) => {
        let response = (await axiosI(`/user/ShortenedUser?user=${userId}`)).data
        return response
    })

    const fullfilledPromises = await Promise.all(promisesArray)
    return fullfilledPromises
}