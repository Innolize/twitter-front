import { Box } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Comment } from './Comment'
import { IComment } from '../../../types/Comment'
import { createSocket } from '../../../api/websockets/server'


interface Props {
    postId: string
    postComments: IComment[]
}

export const CommentContainer: React.FC<Props> = ({ postId, postComments }) => {
    const [comments, setComments] = useState<IComment[]>(postComments)

    const handleUpdateComment = useCallback((comment: IComment) => {
        const index = comments.findIndex(x => x._id === comment._id)
        const newArray = comments
        newArray[index] = comment
        console.log(newArray)
        setComments([...newArray])
    }, [comments])

    const handleRemoveComment = useCallback((commentId: string) => {
        const index = comments.findIndex(x => x._id === commentId)
        console.log(index)
        const newArray = comments
        newArray.splice(index, 1)
        setComments([...newArray])
    }, [comments])

    useEffect(() => {
        const socket = createSocket()
        socket.emit('joinRoom', postId)
        socket.on('updateComment', (data: IComment) => {
            handleUpdateComment(data)
        })
        socket.on('removeComment', (data: IComment) => {
            console.log('data: ', data)
            handleRemoveComment(data._id)
        })
        socket.on('newComment', (newComment: IComment) => {
            setComments(c => [...c, newComment])
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [handleUpdateComment, handleRemoveComment, postId])

    return (
        <Box>
            {comments && comments.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
        </Box>
    )
}
