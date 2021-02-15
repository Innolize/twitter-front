import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { OptionMenuAction, OptionsMenu } from '../common/OptionsMenu'
import { FollowButton } from '../follows/UsersFollowed'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
            height: "90px"
        }
    })
)


interface ProfileOptionsProps {
    loggedUserId: string,
    profileUserId: string
}



export const ProfileOptions: React.FC<ProfileOptionsProps> = ({ loggedUserId, profileUserId }) => {
    const history = useHistory()
    const classes = useStyles()

    const editProfileMenu: OptionMenuAction[] = [
        { description: "Edit Profile", action: () => history.push(`/main/editProfile/${loggedUserId}`) }
    ]
    return (
        <Box className={classes.buttonContainer}>
            <OptionsMenu selfActions={editProfileMenu} authorId={profileUserId}></OptionsMenu>
            {profileUserId !== loggedUserId && <FollowButton userId={profileUserId} />}
        </Box>
    )
}
