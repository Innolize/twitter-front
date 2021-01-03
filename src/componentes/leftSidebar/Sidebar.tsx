import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Grid } from '@material-ui/core';
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

export const Sidebar = (props: any) => {
    const classes = useStyles();
    const user = useSelector((state: RootState) => state.authReducer.user)

    return (
        <Grid item xs={3} className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} to='/main' >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to={`/main/profile/${user?._id}`} >
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={Link} to='/notifications'>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                </ListItem>
            </List>
            {user && <ProfileButton user={user} />}
        </Grid>
    );
}
