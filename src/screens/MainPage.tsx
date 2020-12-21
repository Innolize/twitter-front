import { Box, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { General } from '../componentes/main'
import { Sidebar } from '../componentes/leftSidebar/Sidebar'
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contenedorCentral: {
            //chrome
            '&::-webkit-scrollbar': {
                width: "6px"
            },
            // "&::-webkit-scrollbar-track": {
            //     background: "light-blue"
            // },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: "gray",
                borderRadius: "20px",
                border: "3px solid gray"
            },
            height: "100vh",
            overflowY: "scroll",
            //microsoft
            msOverflowStyle: "none",
            //mozilla
            scrollbarWidth: "thin",
            scrollbarColor: "gray transparent",
            

        },
    })
)

export const MainPage = () => {
    const classes = useStyles()

    return (
        <Box display="flex">
            <Sidebar />
            <Grid item xs={6} className={classes.contenedorCentral}>
                <Route path="/main" exact >
                    <General />
                </Route>
            </Grid>
            <Sidebar />
        </Box>
    )
}
