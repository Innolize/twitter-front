import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import React from 'react'
import { User } from '../../types/User'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        capitalize: {
            textTransform: "capitalize"
        },
        container: {
            '& *': {
                padding: "5px"
            },
        },
    })
)

interface Props {
    user: User
}

export const ProfileInfo: React.FC<Props> = ({ user }) => {
    const classes = useStyles()
    const { name, surname, createdAt } = user
    const joinedDate = moment(createdAt).format("MMM Do YY");

    return (
        <Box display="flex" flexDirection="column" className={classes.container}>
            <Typography variant="h5" className={classes.capitalize}>{name} {surname}</Typography>
            <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor officiis molestiae inventore magni tenetur voluptas accusamus odio, maiores hic eius ipsa? Nesciunt eaque iste, quam aut laboriosam veritatis unde doloribus.</Typography>
            <Box display="flex">
                <CalendarTodayOutlinedIcon></CalendarTodayOutlinedIcon>
                <Typography>Joined at {joinedDate}</Typography>
            </Box>
        </Box>
    )
}
