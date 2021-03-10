import { Box, Typography } from '@material-ui/core'
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

    if (errorMessage) {
        console.log(errorMessage)
        return (
            <div style={{ margin: 20, padding: "5px" }}>
                <Typography variant="h6" align="center" >
                    {errorMessage}
                </Typography>
            </div>
        )



    }

    if (loading) {
        return <Loading></Loading>
    }

    if (isPostArray(successData)) {
        console.log(successData)
        return (
            <Box>
                { successData.map((el, i) => <Post post={el} order={i} key={i} />)}
            </Box>
        )
    }


    return null
}
