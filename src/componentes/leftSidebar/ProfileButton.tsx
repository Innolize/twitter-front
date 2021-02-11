import { Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { User } from '../../types/User'
import { LOG_OUT, } from '../../redux/types/AuthActionTypes'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rounded: {
            borderRadius: '25px'
        },
        profileButton: {
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
}

export const ProfileButton = ({ user }: ProfileButtonProps) => {
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
                    disableTypography
                    primary={<Typography noWrap className={classes.profileButton} title={user.name + " " + user.surname}>{user.name} {user.surname}</Typography>}
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
                <MenuItem>My Profile</MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
        </List >
    )

}