import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'
import { getUserPosts } from '../../api/user/getUserPosts'
import { useFetchReducer } from '../../hooks/useFetch'
import { isPostArray } from '../../types/typeguards/PostArray.typeguard'
import { Post } from '../main/post/Post'

interface Props {
    userId: string
}

export const UserSpecificPosts: React.FC<Props> = ({ userId }) => {

    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getUserPosts, fetchOptions: userId })
    console.log(successData)
    if (loading) {
        return <CircularProgress></CircularProgress>
    }

    if (isPostArray(successData)) {
        return (
            <Box>
                { successData.map((el, i) => <Post post={el} order={i} key={i} />)}

            </Box>
        )
    }

    return null
}
