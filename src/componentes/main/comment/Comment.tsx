import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Typography, IconButton, createStyles, Theme } from '@material-ui/core'
import { ThumbUp } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducer'
import { IComment } from '../../../types/Comment'
import { OptionsMenu } from '../../common/OptionsMenu'

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
                action={showOptions && user &&
                    <OptionsMenu
                        self={self}
                        removeAction={() => console.log(12345)}
                    />}
                title={<Typography variant="h6">{`${name} ${surname}`}</Typography>}

            />
            <CardContent>
                <Typography variant="body2" >
                    {comment.message}
                </Typography>
            </CardContent>
            <Box display='flex' justifyContent='space-around'>
                <IconButton >
                    {/* onClick={userLogged ? (userLike ? quitarLike : darLike) : () => console.log("usuario no logeado")} */}
                    <ThumbUp color={'primary' || 'inherit'} />
                    {/* {likes.length > 0 ? likes.length : null} */}
                </IconButton>
                <Typography className={classes.centeredText}>
                    {/* {time} */}
                </Typography>
            </Box>
        </Card>
    )
}
