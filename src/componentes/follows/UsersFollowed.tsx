import { Avatar, Box, Button, CardHeader, createStyles, Theme, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { followUser } from '../../api/user/followUser'
import { getFollowUser } from '../../api/user/getFollowsUser'
import { useFetchReducer } from '../../hooks/useFetch'
import { RootState } from '../../redux/reducer'
import { USER_FOLLOW_EDITED } from '../../redux/types/AuthActionTypes'
import { UserShort } from '../../types/UserShort'
import { Loading } from '../common/Loading'

export const UsersFollowed: React.FC = () => {
    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getFollowUser })

    if (errorMessage.length) {
        return <div>{errorMessage}</div>
    }

    if (loading) {
        return <Loading></Loading>
    }

    if (successData) {
        const users = successData as UserShort[]
        return (
            <div>
                {
                    users && users.map(user => <TinyUserCard
                        avatar={user.profilePicture || ""}
                        title={user.name + " " + user.surname}
                        userId={user._id}
                        key={user._id}
                    />)
                }
            </div>)
    }

    return null
}

interface UserCardProp {
    avatar: string,
    title: string,
    userId: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "lightgray 1px solid",
            borderRadius: "5px",
            marginBottom: "10px",
        },
        nombreUsuario: {
            display: "block",
            overflow: "hidden",
            width: "200px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "inherit",
            textDecoration: "none"
        }
    })
)

export const TinyUserCard: React.FC<UserCardProp> = ({ avatar, title, userId }) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <CardHeader
                avatar={<Avatar src={avatar}></Avatar>}
                title={
                    <Typography noWrap component={Link} variant="h6" to={`/main/profile/${userId}`} className={classes.nombreUsuario} title={title}>
                        {title}
                    </Typography>
                }

            />
            <FollowButton userId={userId} />
        </Box >
    )
}

interface AddUserProps {
    userId: string
}

export const FollowButton: React.FC<AddUserProps> = ({ userId }) => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const dispatch = useDispatch()
    const isFollowed = user?.followersArr.includes(userId)

    const handleFollowUser = async () => {
        const response = await followUser(userId)
        dispatch({ type: USER_FOLLOW_EDITED, payload: response })
    }

    const handleUnfollowUser = async () => {
        const response = await followUser(userId)
        dispatch({ type: USER_FOLLOW_EDITED, payload: response })
    }

    if (user?._id === userId) {
        return null
    }

    return (
        <Box mx="16px">
            {isFollowed ? <Button variant="outlined" onClick={handleUnfollowUser}>Unfollow</Button> : <Button variant="outlined" onClick={handleFollowUser}>Follow </Button>}
        </Box>
    )



}