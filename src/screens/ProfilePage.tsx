import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../api/user/getUser'
import { ProfileImages } from '../componentes/profile/ProfileImages'
import { ProfileInfo } from '../componentes/profile/ProfileInfo'
import { UserSpecificPosts } from '../componentes/profile/UserSpecificPosts'
import { useFetchReducer } from '../hooks/useFetch'
import { isUser } from '../types/typeguards/User.typeguard'

interface IParams {
    userId: string
}

export const ProfilePage: React.FC = () => {
    const { userId } = useParams<IParams>()

    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getUser, fetchOptions: userId })

    if (isUser(successData)) {
        return (
            <>
                <ProfileImages user={successData} />
                <ProfileInfo user={successData} />
                <UserSpecificPosts userId={userId}></UserSpecificPosts>
            </>
        )
    }

    if (loading) {
        return <CircularProgress></CircularProgress>
    }

    if (errorMessage) {
        return <div>Hubo un error</div>
    }

    return null
}
