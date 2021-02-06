import { Box, Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import { IEmojiData } from 'emoji-picker-react'
import React, { useState } from 'react'
import { createComment } from '../../../api/comment/createComment'
import { EmojiButton } from '../../common/EmojiButton'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            padding: "10px",
            margin: "0px 20px",
            border: "1px solid rgba(0, 0, 0, 0.12)"
        },
        textArea: {
            flexGrow: 1
        }
    })
)

interface Props {
    userId: string,
    postId: string
}

export const CreateComment: React.FC<Props> = ({ postId }) => {
    console.log(postId)
    const classes = useStyles()
    const [text, setText] = useState("")

    const textfieldOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setText(e.target.value)
    }

    const buttonOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const response = createComment({ message: text, postId })
        setText('')
        console.log(response)
    }

    const addEmoji = (e: React.MouseEvent<Element, MouseEvent>, data: IEmojiData) => {
        setText(c => c + data.emoji)
    }

    return (
        <Box display="flex" className={classes.root}>
            <TextField value={text} onChange={textfieldOnChange} variant="outlined" placeholder='Write something...' className={classes.textArea} ></TextField>
            <EmojiButton onEmojiClick={addEmoji}></EmojiButton>
            <Button onClick={buttonOnClick}> Send</Button>
        </Box>
    )
}
