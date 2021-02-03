import { Avatar, Box, Button, CardHeader } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { followUser } from '../../api/user/followUser'
import { getFollowUser } from '../../api/user/getFollowsUser'
import { USER_FOLLOW_EDITED } from '../../redux/types/AuthActionTypes'
import { UserShort } from '../../types/UserShort'

export const UsersFollowed: React.FC = () => {
    const dispatch = useDispatch()
    const [users, setUsers] = useState<UserShort[]>([])

    useEffect(() => {
        const getFollows = async () => {
            try {
                const response = await getFollowUser()
                setUsers(response)
                console.log(response)
                // dispatch({ type: USER_FOLLOW_EDITED, payload: response })
            } catch (err) {
                console.log(err)
            }
        }
        getFollows()
    }, [dispatch])


    return (
        <div>
            {users && users.map(user => <TinyUserCard
                avatar={user.profilePicture || ""}
                title={user.name + " " + user.surname}
                userId={user._id}
                key={user._id}
            />)}
        </div>
    )
}

interface UserCardProp {
    avatar: string,
    title: string,
    userId: string
}

export const TinyUserCard: React.FC<UserCardProp> = ({ avatar, title, userId }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <CardHeader
                avatar={<Avatar src={avatar}></Avatar>}
                title={title}
            />
            {<FollowButton userId={userId} />}
        </Box>
    )
}

interface AddUserProps {
    userId: string,
    initialIsFollowed?: boolean
}

export const FollowButton: React.FC<AddUserProps> = ({ userId, initialIsFollowed = true }) => {
    console.log(userId)
    const dispatch = useDispatch()
    const [isFollowed, setIsFollowed] = useState<boolean>(initialIsFollowed)

    const handleFollowUser = async () => {
        const response = await followUser(userId)
        setIsFollowed(true)
        dispatch({ type: USER_FOLLOW_EDITED, payload: response })
    }

    const handleUnfollowUser = async () => {
        const response = await followUser(userId)
        setIsFollowed(false)
        dispatch({ type: USER_FOLLOW_EDITED, payload: response })
    }
    return (
        <div>
            {isFollowed ? <Button onClick={handleUnfollowUser}>Unfollow</Button> : <Button onClick={handleFollowUser}>Follow </Button>}
        </div>
    )
}