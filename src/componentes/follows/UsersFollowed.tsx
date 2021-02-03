import { Avatar, Box, Button, CardHeader } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { followUser } from '../../api/user/followUser'
import { getFollowUser } from '../../api/user/getFollowsUser'
import { UserShort } from '../../types/UserShort'

interface Props {

}

export const UsersFollowed: React.FC<Props> = (props) => {
    const [users, setUsers] = useState<UserShort[]>([])


    useEffect(() => {
        const getFollows = async () => {
            const response = await getFollowUser()
            setUsers(response)
        }
        getFollows()
    }, [])
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
    userId: string
}

const FollowButton: React.FC<AddUserProps> = ({ userId }) => {
    const [deleted, setDeleted] = useState<boolean>(false)

    const handleAddUser = () => {
        const response = followUser(userId)
        console.log(response)
    }

    const handleDeleteUser = () => {
        setDeleted(true)
    }
    return (
        <div>
            {deleted ? <Button onClick={handleAddUser}>Follow </Button> : <Button onClick={handleDeleteUser}>Unfollow</Button>}
        </div>
    )
}