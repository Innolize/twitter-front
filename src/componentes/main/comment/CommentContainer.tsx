import { Box, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { useFetchReducer } from '../../../hooks/useFetch'
import { Comment } from './Comment'
import { getComments } from '../../../api/comment/getComments'
import { isCommentArray } from '../../../types/typeguards/CommentArray.typeguard'
import { CreateComment } from './CreateComment'
import { RootState } from '../../../redux/reducer'
import { useSelector } from 'react-redux'
import { IComment } from '../../../types/Comment'

interface Props {
    postId: string,
    postComments: IComment[]
}

export const CommentContainer: React.FC<Props> = ({ postId, postComments }) => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const [comments, setComments] = useState<IComment[]>(postComments)


    return (
        <Box>
            {comments && comments.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
            {user && <CreateComment postId={postId} userId={user._id}></CreateComment>}
        </Box>
    )
}
