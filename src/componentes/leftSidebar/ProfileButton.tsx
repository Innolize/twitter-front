import { Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Menu, MenuItem, Theme } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { User } from '../../types/User'
import { LOG_OUT, } from '../../redux/types/AuthActionTypes'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rounded: {
            borderRadius: '25px'
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
            <ListItem button className={classes.rounded} ref={buttonRef} onClick={() => {setShow(true); console.log('no tengo que entrar aca')}}>
                <ListItemAvatar>
                    <Avatar src={user && user.profilePicture ? user.profilePicture : undefined}
                        alt={user.name}
                    ></Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={"" + user.name + " " + user.surname}
                >
                </ListItemText>
            </ListItem>
            <Menu
                id="fade-menu"
                anchorEl={buttonRef.current}
                keepMounted
                open={show}
                onClose={() => setShow(false)}
            >
                <MenuItem onClick={logout}>Log out</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
        </List>
    )

}