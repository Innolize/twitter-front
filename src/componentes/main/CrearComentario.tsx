import { Avatar, Box, Button, createStyles, Input, makeStyles, Theme } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/Photo'
import YouTubeIcon from '@material-ui/icons/YouTube';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react'
import { User } from '../../types/User';
import { createPost } from '../../api/post/createPost';
import { PositionedSnackbar } from '../common/Snackbar'

interface Props {
    user: User
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            margin: "20px 10px 20px 10px"
        },
        textField: {
            margin: "10px 10px 10px 10px",
            width: "90%"
        },
        root: {
            display: "flex",
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 1px"
        },
        contenedorMultimedia: {
            flexGrow: 1
        },
        contenedorBotones: {
            display: "flex",
            width: "90%",
            alignItems: "center"
        }
    }),
);

export const CrearComentario: React.FC<Props> = ({ user }) => {
    const [postContent, setPostContent] = useState("")
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<any>(null)
    const classes = useStyles()

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(e.target.value)
    }

    const sendNewPost = async () => {
        const { success, response } = await createPost(postContent)
        if (success) {
            setSuccess(response)
            setPostContent("")
        } else {
            setError(response)
        }
        
    }

    return (
        <>
            <Box className={classes.root}>
                <Avatar alt="carlitos test" src={user.profilePicture || undefined} className={classes.large}></Avatar>
                <Box style={{ width: "90%" }}>
                    <Input placeholder="Que querés compartir hoy?" className={classes.textField} value={postContent} onChange={inputOnChange} />
                    <Box className={classes.contenedorBotones} id="contenedor-botones" >
                        <Box style={{ flexGrow: 1 }} id="contenedor-multimedia">
                            <PhotoIcon fontSize="large" />
                            <YouTubeIcon fontSize="large" />
                        </Box>

                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            onClick={sendNewPost}
                        >
                            Enviar
                    </Button>
                    </Box>
                </Box>
            </Box>
            {success && <PositionedSnackbar open={true} severity="success" message="Posted successfuly!"></PositionedSnackbar>}
            {error && <PositionedSnackbar open={true} severity="error" message={error || "error"}></PositionedSnackbar>}
        </>
    );
}