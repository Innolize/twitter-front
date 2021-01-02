import { Box, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { useFetchReducer } from '../../../hooks/useFetch'
import { Comment } from './Comment'
import { getComments } from '../../../api/comment/getComments'
import { isCommentArray } from '../../../types/typeguards/CommentArray.typeguard'

interface Props {
    postId: string
}

export const CommentContainer: React.FC<Props> = ({ postId }) => {
    const { successData, loading, errorMessage } = useFetchReducer({ fetchCallback: getComments, fetchOptions: { postId } })

    if (isCommentArray(successData)) {
        return (
            <div>
                {successData.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
            </div>
        )
    }

    if (loading) {
        return (
            <CircularProgress></CircularProgress>
        )
    }

    if (errorMessage) {
        return (
            <div>{errorMessage}</div>
        )
    }
    return (
        null
    )
}
