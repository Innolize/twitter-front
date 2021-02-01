import { Box } from '@material-ui/core'
import React from 'react'
import { getUserPosts } from '../../api/user/getUserPosts'
import { useFetchReducer } from '../../hooks/useFetch'
import { isPostArray } from '../../types/typeguards/PostArray.typeguard'
import { Loading } from '../common/Loading'
import { Post } from '../main/post/Post'

interface Props {
    userId: string
}

export const UserSpecificPosts: React.FC<Props> = ({ userId }) => {

    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getUserPosts, fetchOptions: userId })
    console.log(successData)
    if (loading) {
        return <Loading></Loading>
    }

    if (isPostArray(successData)) {
        return (
            <Box>
                { successData.map((el, i) => <Post post={el} order={i} key={i} />)}
            </Box>
        )
    }
    if (errorMessage) {
        <div>{errorMessage}</div>
    }

    return null
}
