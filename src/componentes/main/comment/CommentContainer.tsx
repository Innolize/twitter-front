import { Box, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { useFetchReducer } from '../../../hooks/useFetch'
import { Comment } from './Comment'
import { getComments } from '../../../api/comment/getComments'
import { isCommentArray } from '../../../types/typeguards/CommentArray.typeguard'
import { CreateComment } from './CreateComment'
import { RootState } from '../../../redux/reducer'
import { useSelector } from 'react-redux'

interface Props {
    postId: string
}

export const CommentContainer: React.FC<Props> = ({ postId }) => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const { successData, loading, errorMessage } = useFetchReducer({ fetchCallback: getComments, fetchOptions: { postId } })

    if (isCommentArray(successData)) {
        return (
            <Box>
                {successData.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
                {user && <CreateComment postId={postId} userId={user._id}></CreateComment>}
            </Box>
        )
    }

    

    if (loading) {
        return (
            <CircularProgress />
        )
    }

    if (errorMessage.length) {
        return (
            <div>{errorMessage}</div>
        )
    }

    return (
        <Box>
            {user && <CreateComment postId={postId} userId={user._id}></CreateComment>}
        </Box>
    )
}
