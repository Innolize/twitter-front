import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { createSocket } from '../../../api/websockets/server'
import { Post as IPost } from '../../../types/Post'
import { Post } from './Post'

interface Props {
    posts: IPost[]
}

export const PostContainer: React.FC<Props> = ({ posts }) => {

    const [postArray, setPostArray] = useState<IPost[]>(posts)
    const [newPosts, setNewPosts] = useState<IPost[]>([])
    console.log("posts array: ", postArray)
    useEffect(() => {
        const socket = createSocket()
        socket.emit("joinRoom", "general")
        socket.on("newPost", (data: IPost) => {
            setNewPosts(c => [data, ...c])
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [])

    const newPostNotificationOnClick = () => {
        setPostArray([...newPosts, ...postArray])
        setNewPosts([])
    }

    return (
        <>
            {!!newPosts.length &&
                <Box textAlign="center" onClick={newPostNotificationOnClick}>
                    {newPosts.length} new posts
            </Box>}
            {postArray.map((el, i) => <Post post={el} order={i} key={i} />)}
        </>

    )
}
