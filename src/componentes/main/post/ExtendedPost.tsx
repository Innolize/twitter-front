import React, { useCallback, useEffect, useState } from 'react'
import { CommentContainer } from '../comment/CommentContainer'
import { Post } from './Post'
import { Post as IPost } from '../../../types/Post'
import { IComment } from '../../../types/Comment'
import { createSocket } from '../../../api/websockets/server'

interface ExtendedPostProps {
    post: IPost,
    comments: IComment[]
}

const ExtendedPost: React.FC<ExtendedPostProps> = ({ post, comments }) => {
    const [postData, setPostData] = useState(post)
    const [commentsData, setCommentsData] = useState<IComment[]>(comments)

    const handleUpdatePost = useCallback((comment: IComment, action: "remove" | "update" | "newComment") => {

        console.log(action)
        if (action === 'newComment') {
            console.log('new comment: ', comment)
            setCommentsData([...commentsData, comment])
            setPostData({ ...postData, commentsNumb: postData.commentsNumb + 1 })
        }

        const newArray = commentsData
        const index = commentsData.findIndex(x => x._id === comment._id)

        if (index === -1) {
            // -1 significa que no encontro index
            return console.log('no se encontro index')
        }

        if (action === "update") {
            newArray[index] = comment
            setCommentsData([...newArray])
            return
        } if (action === "remove") {

            newArray.splice(index, 1)
            setCommentsData([...newArray])
            setPostData({ ...postData, commentsNumb: postData.commentsNumb - 1 })
            return

        }
    }, [postData, commentsData])

    useEffect(() => {
        const socket = createSocket()
        socket.emit('joinRoom', postData._id)
        socket.on('updateCommentArray', (data: IComment) => {
            handleUpdatePost(data, "update")
        })
        socket.on('removeCommentArray', (data: IComment) => {
            handleUpdatePost(data, "remove")
        })
        socket.on('newComment', (data: IComment) => {
            handleUpdatePost(data, "newComment")
        })
        socket.on("updateSpecificPost", (data: IPost) => {
            setPostData(data)
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [handleUpdatePost, postData])

    return (
        <div>
            <Post post={postData}></Post>
            <CommentContainer postId={postData._id} postComments={commentsData} ></CommentContainer>
        </div>
    )
}

export default ExtendedPost
