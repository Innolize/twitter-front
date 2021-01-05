import { Avatar, Card, CardActions, CardContent, CardHeader, createStyles, Fade, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import React, { useState } from 'react'
import { Post as IPost } from '../../../types/Post'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/reducer';
import { useSelector } from 'react-redux';
import { likePost } from '../../../api/post/likePost';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 1px",
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        cardAction: {
            display: "flex",
            justifyContent: "space-around"
        },
        title: {
            color: "inherit",
            textDecorationLine: "none",
            textTransform: "capitalize"
        }
    })
)

interface Props {
    post: IPost
    order?: number
}

export const Post: React.FC<Props> = ({ post, order = 1 }) => {
    const classes = useStyles()
    const createdSince = moment(post.createdAt).fromNow()
    const user = useSelector((state: RootState) => state.authReducer.user)
    const postLiked = user && post.likesArr.includes(user._id)
    const [like, setLike] = useState<Boolean | null>(postLiked)

    const likeAction = async () => {
        const response = await likePost(post._id)
        setLike(response)
    }

    return (
        <Fade in={true} style={{ transitionDelay: `${order * 300}ms` }}>
            <div >
                <Card className={classes.root} id="contenedor-post" variant="outlined">
                    <CardHeader
                        avatar={<Avatar src={post.author.profilePicture || undefined} className={classes.large} />}
                        title={
                            <Typography component={Link} variant="h5" to={`/main/profile/${post.author._id}`} className={classes.title}>
                                {post.author.name} {post.author.surname}
                            </Typography>
                        }
                        subheader={createdSince}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            {post.message}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <IconButton onClick={likeAction}>
                            <FavoriteIcon color={like ? "primary" : "inherit"} />
                            <p>{like ? post.likesNumb + 1 : post.likesNumb}</p>
                        </IconButton>
                        <IconButton component={Link} to={`/main/post/${post._id}`}>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
                    </CardActions>

                </Card>

            </div>
        </Fade>
    );
}