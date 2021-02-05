import { Box, createStyles, Fab, makeStyles, SwipeableDrawer, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            left: "20px",
            zIndex: 1,
            position: "fixed",
            opacity: "0.8"
        }
    })
)

export const BurgerSideBar: React.FC = () => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box className={classes.root}>
            <Fab onClick={handleOpen}>
                <MenuIcon />
            </Fab>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={handleClose}
                onOpen={() => { console.log('aca triggerea') }}
                onClick={handleClose}
            >
                <Sidebar>
                </Sidebar>
            </SwipeableDrawer>
        </Box >
    )
}
