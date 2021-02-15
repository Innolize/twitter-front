import { Avatar, Box, Card, CardActions, CardContent, CardHeader, createStyles, Fade, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React, { useEffect, useState } from 'react'
import { Post as IPost } from '../../../types/Post'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../../api/post/likePost';
import { getUserLikeAvatars } from '../../../api/user/getUserLikeAvatars';
import { AvatarGroup } from '@material-ui/lab';
import { OptionMenuAction, OptionsMenu } from '../../common/OptionsMenu';
import { deletePost } from '../../../api/post/deletePost';
import { UserShort } from '../../../types/UserShort';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 3px",
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
        nombreUsuario: {
            display: "block",
            overflow: "hidden",
            width: "200px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "inherit",
            textDecoration: "none",
            textTransform: "capitalize",
            [theme.breakpoints.up('sm')]: {
                width: 250
            },
            [theme.breakpoints.up('md')]: {
                width: 300
            }
        }
    })
)

interface Props {
    post: IPost
    order?: number
}

export const Post: React.FC<Props> = ({ post, order = 1 }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const createdSince = moment(post.createdAt).fromNow()
    const user = useSelector((state: RootState) => state.authReducer.user)
    const postLiked = user && post.likesArr.includes(user._id)
    const [likeAvatars, setLikeAvatars] = useState<UserShort[]>([])

    const likeAction = async () => {
        const response = await likePost(post._id)
        console.log(response)
    }

    useEffect(() => {
        const asyncFunction = async () => {
            if (!!post.likesArr.length) {
                const userArray = post.likesArr.slice(0, 5)
                console.log(userArray)
                let userAvatarsResponse = await getUserLikeAvatars(userArray)
                setLikeAvatars(userAvatarsResponse)
            } else {
                setLikeAvatars([])
            }
        }
        asyncFunction()

    }, [post.likesArr])

    const removePost = async (postId: string) => {
        const response = await deletePost(postId)
        if (response.success) {
            dispatch({ type: "SET_SUCCESS", payload: "Post deleted successfuly" })
        } else {
            dispatch({ type: "SET_ERROR", payload: response.error })
        }
    }


    const selfAction: OptionMenuAction = {
        description: "Delete",
        action: () => removePost(post._id)
    }

    return (
        <Fade in={true} style={{ transitionDelay: `${order * 300}ms` }}>
            <div >
                <Card className={classes.root} id="contenedor-post" variant="outlined">
                    <CardHeader
                        className={classes.paddingRemover}
                        avatar={<Avatar src={post.author.profilePicture || undefined} className={classes.large} />}
                        title={
                            <Typography component={Link} variant="h5" to={`/main/profile/${post.author._id}`} className={classes.nombreUsuario}>
                                {post.author.name} {post.author.surname}
                            </Typography>
                        }
                        subheader={createdSince}
                        action={
                            <OptionsMenu selfActions={[selfAction]} authorId={post.author._id} />}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            {post.message}
                        </Typography>
                    </CardContent>
                    <CardActions className={`${classes.cardAction} ${classes.paddingRemover}`}>
                        <Grid container>
                            <Grid item xs>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <IconButton onClick={likeAction}>
                                        {postLiked ?
                                            <FavoriteIcon color="primary" /> : <FavoriteBorderIcon color="inherit" />}

                                    </IconButton>
                                    <Typography variant="h6">{post.likesNumb}</Typography>
                                    {!!likeAvatars && <AvatarGroup max={3} spacing="medium" classes={{ avatar: classes.small }}>
                                        {likeAvatars && likeAvatars.map((avatar, i) => <Avatar alt={avatar.name + " " + avatar.surname} src={avatar.profilePicture || ""} key={i}></Avatar>)}
                                    </AvatarGroup>}
                                </Box>
                            </Grid>
                            <Grid item xs>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <IconButton component={Link} to={`/main/post/${post._id}`}>
                                        <ChatIcon />
                                    </IconButton>
                                    {(!!post.commentsNumb) && <Typography variant="h6">{post.commentsNumb}</Typography>}
                                </Box>
                            </Grid>
                            <Grid item xs>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <IconButton>
                                        <ShareIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardActions>

                </Card>

            </div>
        </Fade>
    );
}