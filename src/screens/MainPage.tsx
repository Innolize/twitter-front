import { createStyles, Grid, Hidden, makeStyles, Theme } from '@material-ui/core'
import { RootState } from '../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Sidebar } from '../componentes/leftSidebar/Sidebar'
import { Redirect, Route } from 'react-router-dom'
import { General } from '../componentes/main'
import { useEffect } from 'react'
import { handleRefreshToken } from '../redux/actions/logginAction'
import { DetailedPost } from '../componentes/main/post/DetailedPost'
import { ProfilePage } from './ProfilePage'
import { EditProfilePage } from './EditProfilePage'
import { Loading } from '../componentes/common/Loading'

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
    const dispatch = useDispatch()
    const { user, logged, loading } = useSelector((state: RootState) => state.authReducer)

    useEffect(() => {
        async function checkUser() {
            if (logged === false) {
                return
            }
            if (!user) {
                dispatch(handleRefreshToken())
            }
        }
        checkUser()
    }, [user, dispatch, logged])


    if (logged === false) {
        return <Redirect to="/login"></Redirect>
    }


    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return (
            // <Box display="flex" justifyContent="center" >
            <Grid container justify="center" >

                <Grid item md={3}>
                    <Hidden smDown>
                        <Sidebar />
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6} className={classes.contenedorCentral}>
                    <Route path="/main/post/:postId" >
                        <DetailedPost></DetailedPost>
                    </Route>
                    <Route path="/main/profile/:userId" >
                        <ProfilePage></ProfilePage>
                    </Route>
                    <Route path="/main/editProfile/:userId">
                        <EditProfilePage />
                    </Route>
                    <Route path="/main" exact >
                        <General />
                    </Route>

                </Grid>
            </Grid>
            // </Box>
        )
    }
    else {
        return null
    }

}
