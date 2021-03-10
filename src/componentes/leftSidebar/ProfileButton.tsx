import { Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { User } from '../../types/User'
import { LOG_OUT, } from '../../redux/types/AuthActionTypes'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rounded: {
            borderRadius: '25px'
        },
        profileButton: {
            fontSize: "1.25rem",
            display: "block",
            overflow: "hidden",
            width: "200px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        }
    })
)

interface ProfileButtonProps {
    user: User
    onClickDrawer?: () => void
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ user, onClickDrawer = () => { } }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const buttonRef = useRef<HTMLDivElement>(null)
    const [show, setShow] = useState<boolean>(false)
    const logout = () => {
        dispatch({ type: LOG_OUT })
    }

    return (
        <List>
            <ListItem button className={classes.rounded} ref={buttonRef} onClick={() => { setShow(true) }}>
                <ListItemAvatar>
                    <Avatar src={user && user.profilePicture ? user.profilePicture : undefined}
                        alt={user.name}
                    ></Avatar>
                </ListItemAvatar>
                <ListItemText
                    // disableTypography
                    primary={<Typography component="h1" noWrap className={classes.profileButton} title={user.name + " " + user.surname}>{user.name} {user.surname}</Typography>}
                >
                </ListItemText>
            </ListItem>
            <Menu
                id="fade-menu"
                anchorEl={buttonRef.current}
                keepMounted
                open={show}
                onClose={() => setShow(false)}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: 100, horizontal: -100, }}
            >
                <MenuItem button component={Link} onClick={onClickDrawer} to={`/main/profile/${user?._id}`}>My Profile</MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
        </List >
    )

}