import { Box } from '@material-ui/core'
import React from 'react'
import { Comment } from './Comment'
import { IComment } from '../../../types/Comment'
import { CreateComment } from './CreateComment'

interface Props {
    postId: string
    postComments: IComment[]
}

export const CommentContainer: React.FC<Props> = ({ postId, postComments }) => {

    return (
        <Box>
            {postComments && postComments.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
            <CreateComment postId={postId}></CreateComment>
        </Box>
    )
}
