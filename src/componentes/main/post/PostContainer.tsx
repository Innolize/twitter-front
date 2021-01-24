import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
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
    posts: IPost[]
}

export const PostContainer: React.FC<Props> = ({ posts }) => {

    const classes = useStyles()
    const user = useSelector((store: RootState) => store.authReducer.user)
    const [postArray, setPostArray] = useState<IPost[]>(posts)
    // const [newPosts, setNewPosts] = useState<IPost[]>([])
    useEffect(() => {
        const socket = createSocket()
        socket.emit("joinRoom", "general")
        socket.on("newPost", (data: IPost) => {

            setPostArray(c => [data, ...c])
            // if (data.author._id === user?._id) {
            // } else {
            //     setNewPosts(c => [data, ...c])
        })
        return () => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }, [])

    // const newPostNotificationOnClick = () => {
    //     setPostArray([...newPosts, ...postArray])
    //     setNewPosts([])
    // }

    return (
        <Box className={classes.root}>
            {/* {!!newPosts.length &&
                <Box textAlign="center" onClick={newPostNotificationOnClick}>
                    {newPosts.length} new posts
            </Box>} */}
            {postArray.map((el, i) => <Post post={el} order={i} key={el._id} />)}
        </Box>

    )
}
