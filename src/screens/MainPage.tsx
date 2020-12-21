import { Box, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { General } from '../componentes/main'
import { Sidebar } from '../componentes/leftSidebar/Sidebar'
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contenedorCentral: {
            height: "100vh",
            overflowY: "scroll",

        }
    })
)

export const MainPage = () => {
    const classes = useStyles()

    return (
        <Box display="flex" >
            <Sidebar />
            <Grid item xs={6} className={classes.contenedorCentral}>
                <Route path="/" exact >
                    <General />
                </Route>
            </Grid>
            <Sidebar />
        </Box>
    )
}
