import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { createSocket } from '../../../api/websockets/server'
import { Post as IPost } from '../../../types/Post'
import { Post } from './Post'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // display: "flex",
            // flexDirection: "row",
            // [theme.breakpoints.down('sm')]: {
            //     width: "100%"
            // }
        }
    })
)

interface Props {
    initialPosts: IPost[]
}

export const PostContainer: React.FC<Props> = ({ initialPosts }) => {

    const classes = useStyles()
    const [posts, setPosts] = useState<IPost[]>(initialPosts)
    // const [newPosts, setNewPosts] = useState<IPost[]>([])

    const handlePostUpdate = useCallback((data: IPost, action: "newPost" | "removePost" | "updatePost") => {

        const myNewPosts = posts
        const index = myNewPosts.findIndex(curr => curr._id === data._id)

        if (action === "updatePost") {
            myNewPosts[index] = data
            setPosts([...myNewPosts])
        }
        if (action === "removePost") {
            myNewPosts.splice(index, 1)
            setPosts([...myNewPosts])
            return
        }


    }, [posts])

    useEffect(() => {
        const socket = createSocket()
        socket.emit("joinRoom", "general")
        socket.on("newPost", (data: IPost) => {

            setPosts(c => [data, ...c])
        })
        socket.on('updatePost', (post: IPost) => {
            handlePostUpdate(post, "updatePost")
        })

        socket.on("removePost", (post: IPost) => {
            handlePostUpdate(post, "removePost")
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [handlePostUpdate])

    return (
        <Box className={classes.root}>
            {posts.map((el, i) => <Post post={el} order={i} key={el._id} />)}
        </Box>

    )
}
