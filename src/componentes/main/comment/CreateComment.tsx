import { Box, Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { createComment } from '../../../api/comment/createComment'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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

    return (
        <Box display="flex" className={classes.root}>
            <TextField value={text} onChange={textfieldOnChange} variant="outlined" placeholder='Write something...' className={classes.textArea} ></TextField>
            <Button onClick={buttonOnClick}> Send</Button>
        </Box>
    )
}
