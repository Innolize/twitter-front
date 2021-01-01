import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Typography, IconButton, createStyles, Theme } from '@material-ui/core'
import { ThumbUp } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducer'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "90%",
            padding: 0
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

}

export const Comment: React.FC<Props> = ({ }) => {

    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state: RootState) => state.authReducer.user)
    const classes = useStyles()


    return (

        <Card className={classes.root}
            variant="outlined"
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
        >
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" src={user?.profilePicture || undefined} className={classes.avatar} />

                }
                // action={showOptions && userLogged &&
                // <Opciones
                //     self={selfComment}
                //     payload={{ postID, commentID: id }}
                //     callbackAction={eliminarComentario}
                // />}
                title={<Typography variant="h6">{`${user?.name} ${user?.surname}`}</Typography>}

            />
            <CardContent>
                <Typography variant="body2" >
                    Test comment
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
