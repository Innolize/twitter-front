import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Typography, IconButton, createStyles, Theme } from '@material-ui/core'
import { ThumbUp } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteComment } from '../../../api/comment/deleteComment'
import { likeComment } from '../../../api/comment/likeComment'
import { RootState } from '../../../redux/reducer'
import { IComment } from '../../../types/Comment'
import { OptionMenuAction, OptionsMenu } from '../../common/OptionsMenu'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 0,
            margin: "0px 20px"
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
            width: theme.spacing(3),
            height: theme.spacing(3)
        }
    })
)

interface Props {
    comment: IComment
}

export const Comment: React.FC<Props> = ({ comment }) => {
    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state: RootState) => state.authReducer.user)
    const classes = useStyles()
    const self = comment.author._id === user?._id
    const { name, profilePicture, surname } = comment.author
    const commentLiked = user && comment.likesArr.includes(user._id)

    const removeComment = async (commentId: string) => {
        const result = await deleteComment(commentId)
        if (result.success) {
            console.log(result.message)
        } else {
            console.log(result.message)
        }
    }

    const removeCommentAction: OptionMenuAction = {
        description: "Delete",
        action: () => removeComment(comment._id)
    }


    const likeOnClick = async () => {
        const response = await likeComment(comment._id)
        console.log(response)
    }
    console.log("LikesArr: ", comment.likesArr)
    console.log("commentLiked: ", commentLiked)

    return (

        <Card className={classes.root}
            variant="outlined"
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
        >
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" src={profilePicture || undefined} className={classes.avatar} />

                }
                action={
                    <OptionsMenu
                        removeAction={() => console.log("reportado papu")}
                        selfActions={[removeCommentAction]}
                    />}
                title={<Typography variant="h6">{`${name} ${surname}`}</Typography>}

            />
            <CardContent>
                <Typography variant="body2" >
                    {comment.message}
                </Typography>
            </CardContent>
            <Box display='flex' justifyContent='space-around'>
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
