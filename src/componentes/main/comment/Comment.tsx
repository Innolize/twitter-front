import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Typography, IconButton, createStyles, Theme } from '@material-ui/core'
import { ThumbUp } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../api/comment/deleteComment'
import { likeComment } from '../../../api/comment/likeComment'
import { RootState } from '../../../redux/reducer'
import { SET_ERROR, SET_SUCCESS } from '../../../redux/types/AuthActionTypes'
import { IComment } from '../../../types/Comment'
import { OptionMenuAction, OptionsMenu } from '../../common/OptionsMenu'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            margin: "10px 30px",
            border: "solid #E1E8ED 2px",
        },
        cardHeader: {
            padding: 8
        },
        inputText: {
            flexGrow: 1
        },
        centeredText: {
            margin: 'auto 0px'
        },
        avatar: {
            width: theme.spacing(5),
            height: theme.spacing(5)
        },
        nombreUsuario: {
            display: "block",
            overflow: "hidden",
            width: "200px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
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
    comment: IComment
}

export const Comment: React.FC<Props> = ({ comment }) => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const classes = useStyles()
    const dispatch = useDispatch()

    const { name, profilePicture, surname, _id: authorId } = comment.author
    const commentLiked = user && comment.likesArr.includes(user._id)
    const removeComment = async (commentId: string) => {
        const result = await deleteComment(commentId)
        if (!result.success) {
            console.log(result.error)
            dispatch({ type: SET_ERROR, payload: result.error })
        } else {
            dispatch({ type: SET_SUCCESS, payload: result.data })
        }
    }

    const removeCommentAction: OptionMenuAction = {
        description: "Delete",
        action: () => removeComment(comment._id)
    }


    const likeOnClick = async () => {
        await likeComment(comment._id)
        console.log("hice click al boton de like: ")
    }

    return (

        <Card className={classes.root}
            variant="outlined"
        >
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" src={profilePicture || undefined} className={classes.avatar} />

                }
                action={
                    <OptionsMenu
                        removeAction={() => console.log("reported")}
                        authorId={authorId}
                        selfActions={[removeCommentAction]}
                    />}
                title={<Typography variant="h6" title={`${name} ${surname}`} className={classes.nombreUsuario}>{`${name} ${surname}`}</Typography>}

            />
            <CardContent>
                <Typography variant="body2" >
                    {comment.message}
                </Typography>
            </CardContent>
            <Box display='flex' pl="16px">
                <IconButton onClick={likeOnClick} >

                    <ThumbUp color={commentLiked ? 'primary' : 'inherit'} />
                    {comment.likesNumb > 0 ? comment.likesNumb : null}
                </IconButton>
                <Typography className={classes.centeredText}>
                    {/* {time} */}
                </Typography>
            </Box>
        </Card>
    )
}
