import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import React from 'react'
import { User } from '../../types/User'
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
    user: User
}

export const ProfileInfo: React.FC<Props> = ({ user }) => {
    const classes = useStyles()
    const { name, surname, createdAt, bio } = user
    const joinedDate = moment(createdAt).format("MMM Do YY");

    return (
        <Box display="flex" flexDirection="column" className={classes.container}>
            <Typography variant="h5" className={classes.header}>{name} {surname}</Typography>
            <Typography variant="body1">{bio || "bio vacio ekisde"}</Typography>
            <Box display="flex">
                <CalendarTodayOutlinedIcon></CalendarTodayOutlinedIcon>
                <Typography>Joined at {joinedDate}</Typography>
            </Box>
        </Box>
    )
}
