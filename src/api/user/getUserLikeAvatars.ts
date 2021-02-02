import { axiosI } from '../../common/IAxios'

export type LilUser = {
    profilePicture: string,
    name: string,
    surname: string,
    _id: string
}

export const getUserLikeAvatars = async (idArray: string[]): Promise<LilUser[]> => {
    const promisesArray = idArray.map(async (userId) => {
        let response = (await axiosI(`/user/ShortenedUser?user=${userId}`)).data
        return response
    })

    const fullfilledPromises = await Promise.all(promisesArray)
    return fullfilledPromises
}