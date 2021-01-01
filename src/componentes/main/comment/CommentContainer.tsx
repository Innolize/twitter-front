import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import { Comment as IComment } from '../../../types/Comment'
import { Comment } from './Comment'

interface Props {
    // postId: string
}

export const CommentContainer: React.FC<Props> = ({ }) => {
    const [comments, setComments] = useState<any>([1, 2, 3])

    return (
        <Box>
            {comments && comments.map(() => <Comment></Comment>)}
        </Box>
    )
}
