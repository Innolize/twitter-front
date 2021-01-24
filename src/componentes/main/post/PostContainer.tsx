import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createSocket } from '../../../api/websockets/server'
import { RootState } from '../../../redux/reducer'
import { Post as IPost } from '../../../types/Post'
import { Post } from './Post'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // display: "flex",
            // flexDirection: "row",
            [theme.breakpoints.down('sm')]: {
                width: "100%"
            }
        }
    })
)

interface Props {
    initialPosts: IPost[]
}

export const PostContainer: React.FC<Props> = ({ initialPosts }) => {

    const classes = useStyles()
    const user = useSelector((store: RootState) => store.authReducer.user)
    const [posts, setPosts] = useState<IPost[]>(initialPosts)
    // const [newPosts, setNewPosts] = useState<IPost[]>([])

    const removePostHandler = useCallback((data: IPost) => {
        const myNewPosts = posts
        const index = myNewPosts.findIndex(curr => curr._id === data._id)
        myNewPosts.splice(index, 1)
        setPosts([...myNewPosts])
    }, [posts])

    useEffect(() => {
        const socket = createSocket()
        socket.emit("joinRoom", "general")
        socket.on("newPost", (data: IPost) => {

            setPosts(c => [data, ...c])
        })
        socket.on("removePost", (newPost: IPost) => {
            removePostHandler(newPost)
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [removePostHandler])

    return (
        <Box className={classes.root}>
            {posts.map((el, i) => <Post post={el} order={i} key={el._id} />)}
        </Box>

    )
}
