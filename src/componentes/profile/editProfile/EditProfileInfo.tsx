import { Box, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import React, { useState } from 'react'
import { User } from '../../../types/User'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '& *': {
                padding: "5px"
            },
        },
        header: {
            textTransform: "capitalize",
        }
    })
)

interface Props {
    bio: string
    name: string
    surname: string
    nameOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    surnameOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeBio: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const EditProfileInfo: React.FC<Props> = ({ name, surname, bio, onChangeBio, nameOnChange, surnameOnChange }) => {
    const classes = useStyles()

    return (
        <Box display="flex" flexDirection="column" className={classes.container}>
            <Typography variant="h5" className={classes.header}>{name} {surname}</Typography>
            <TextField variant="outlined" value={name} onChange={nameOnChange} label="name"></TextField>
            <TextField variant="outlined" value={surname} onChange={surnameOnChange} label="surname"></TextField>
            <TextField
                label="bio"
                variant="outlined"
                value={bio || ""}
                onChange={onChangeBio}
                multiline
            ></TextField>
        </Box>
    )
}
