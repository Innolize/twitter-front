import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { ProfileButton } from './ProfileButton';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }
    }),
);

interface SidebarProps {
    onClickClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onClickClose = () => { } }) => {
    const classes = useStyles();
    const user = useSelector((state: RootState) => state.authReducer.user)

    return (
        <Grid item className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} onClick={onClickClose} to='/main' >
                    <ListItemIcon>
                        <HomeIcon></HomeIcon>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="h6">Home</Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link} onClick={onClickClose} to={`/main/profile/${user?._id}`} >
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="h6">Profile</Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link} onClick={onClickClose} to='/main/myFollows'>
                    <ListItemIcon>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText >
                        <Typography variant="h6">My Follows</Typography>
                    </ListItemText>
                </ListItem>
                <ListItem button component={Link} onClick={onClickClose} to="/main/find">
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText >
                        <Typography variant="h6">Find Friends</Typography>
                    </ListItemText>
                </ListItem>

            </List>
            {user && <ProfileButton user={user} onClickDrawer={onClickClose} />}
        </Grid>
    );
}
