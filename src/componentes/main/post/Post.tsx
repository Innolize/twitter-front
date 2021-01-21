import { Avatar, Box, Card, CardActions, CardContent, CardHeader, createStyles, Fade, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import React, { useEffect, useState } from 'react'
import { Post as IPost } from '../../../types/Post'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/reducer';
import { useSelector } from 'react-redux';
import { likePost } from '../../../api/post/likePost';
import { getUserLikeAvatars, LilUser } from '../../../api/user/getUserLikeAvatars';
import { AvatarGroup } from '@material-ui/lab';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 1px",
        },
        paddingRemover: {
            padding: 0
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            backgroundColor: "gray",
            border: "solid black 1px"
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
    const [currentLike, setCurrentLike] = useState<Boolean | null>(postLiked)
    const [likeAvatars, setLikeAvatars] = useState<LilUser[]>([])

    const likeAction = async () => {
        const response = await likePost(post._id)
        setCurrentLike(response)
    }

    useEffect(() => {
        const asyncFunction = async () => {
            if (!!post.likesArr.length) {
                const userArray = post.likesArr.slice(0, 4)
                let userAvatarsResponse = await getUserLikeAvatars(userArray)
                setLikeAvatars(userAvatarsResponse)
            }
        }
        asyncFunction()

    }, [])

    return (
        <Fade in={true} style={{ transitionDelay: `${order * 300}ms` }}>
            <div >
                <Card className={classes.root} id="contenedor-post" variant="outlined">
                    <CardHeader
                        className={classes.paddingRemover}
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
                    <CardActions className={`${classes.cardAction} ${classes.paddingRemover}`}>

                        <Box display="flex" alignItems="center">
                            <IconButton onClick={likeAction}>
                                <FavoriteIcon color={currentLike ? "primary" : "inherit"} />
                            </IconButton>
                            {(post.likesNumb || currentLike) && <Typography variant="h6">{postLiked ? currentLike ? post.likesNumb : post.likesNumb - 1 : currentLike ? post.likesNumb + 1 : post.likesNumb}</Typography>}
                            {!!likeAvatars && <AvatarGroup max={4} spacing="medium">
                                {likeAvatars.map((avatar, i) => <Avatar alt={avatar.name + " " + avatar.surname} src={avatar.profilePicture} className={classes.small} key={i}></Avatar>)}

                            </AvatarGroup>}
                            {likeAvatars.length > 4 && `+ ${likeAvatars.length - 4} persons `}
                        </Box>
                        <Box display="flex" alignItems="center">
                            <IconButton component={Link} to={`/main/post/${post._id}`}>
                                <ChatIcon />
                            </IconButton>
                            {(!!post.commentsNumb) && <Typography variant="h6">{post.commentsNumb}</Typography>}
                        </Box>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
                    </CardActions>

                </Card>

            </div>
        </Fade>
    );
}