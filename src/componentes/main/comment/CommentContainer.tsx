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

    const handleUpdateComment = useCallback((comment: IComment, action: "remove" | "update") => {
        const index = comments.findIndex(x => x._id === comment._id)
        console.log(comments.findIndex(x => x._id === comment._id))
        if (index === -1) {
            // -1 significa que no encontro index
            return console.log('no se encontro index')
        }

        const newArray = comments

        if (action === "update") {
            newArray[index] = comment
            console.log("Array actualizado: ", newArray)
            setComments([...newArray])
            return
        } if (action === "remove") {

            newArray.splice(index, 1)
            console.log("Comentario eliminado: ", newArray)
            setComments([...newArray])
            return
        } else {
            console.log("esto nunca debe pasar utilizando typescript")
        }
    }, [comments])

    useEffect(() => {
        const socket = createSocket()
        socket.emit('joinRoom', postId)
        socket.on('updateComment', (data: IComment) => {
            handleUpdateComment(data, "update")
        })
        socket.on('removeComment', (data: IComment) => {
            console.log('data: ', data)
            handleUpdateComment(data, "remove")
        })
        socket.on('newComment', (newComment: IComment) => {
            setComments(c => [...c, newComment])
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [handleUpdateComment, postId])

    return (
        <Box>
            {comments && comments.map((el, idx) => <Comment comment={el} key={idx}></Comment>)}
        </Box>
    )
}
