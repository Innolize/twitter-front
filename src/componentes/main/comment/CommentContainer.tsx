import { Box, CircularProgress } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Comment } from './Comment'
import { CreateComment } from './CreateComment'
import { RootState } from '../../../redux/reducer'
import { useSelector } from 'react-redux'
import { IComment } from '../../../types/Comment'
import { createSocket } from '../../../api/websockets/server'
import { Socket } from 'socket.io-client'

interface Props {
    postId: string,
    postComments: IComment[]
}

export const CommentContainer: React.FC<Props> = ({ postId, postComments }) => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const [comments, setComments] = useState<IComment[]>(postComments)

    useEffect(() => {
        const socket = createSocket()
        socket.emit('joinRoom', postId)
        console.log('test')
        socket.on('newComment', (newComment: IComment) => {
            setComments(c => [...c, newComment])
        })

        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [])



    return (
        <Box>
            {comments && comments.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
            {user && <CreateComment postId={postId} userId={user._id}></CreateComment>}
        </Box>
    )
}
