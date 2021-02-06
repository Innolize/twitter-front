import { Avatar, Box, Button, createStyles, Input, makeStyles, Theme } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react'
import { User } from '../../types/User';
import { createPost } from '../../api/post/createPost';
import { EmojiButton } from '../common/EmojiButton'
import { IEmojiData } from 'emoji-picker-react'
import { useDispatch } from 'react-redux';
import { SET_ERROR, SET_SUCCESS } from '../../redux/types/AuthActionTypes';



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
            alignItems: "center",
            justifyContent: "flex-end"
        }
    }),
);

interface Props {
    user: User
}

export const CrearComentario: React.FC<Props> = ({ user }) => {
    const dispatch = useDispatch()
    const [postContent, setPostContent] = useState("")
    const classes = useStyles()

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostContent(e.target.value)
    }

    const sendNewPost = async () => {
        const { success, error } = await createPost(postContent)
        if (success) {
            dispatch({ type: SET_SUCCESS, payload: "Post successfuly created!" })
            setPostContent("")
        } else if (error) {
            dispatch({ type: SET_ERROR, payload: error })
        }
    }

    const handleEmojiClick = (e: React.MouseEvent<Element, MouseEvent>, data: IEmojiData) => {
        setPostContent(c => c + data.emoji)
    }


    return (
        <>
            <Box className={classes.root}>
                <Avatar alt="carlitos test" src={user.profilePicture || undefined} className={classes.large}></Avatar>
                <Box style={{ width: "90%" }}>
                    <Input autoFocus placeholder="Que querés compartir hoy?" className={classes.textField} value={postContent} onChange={inputOnChange} />
                    <Box className={classes.contenedorBotones} id="contenedor-botones" >
                        <EmojiButton onEmojiClick={handleEmojiClick}></EmojiButton>
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
        </>
    );
}