import React from 'react'
import { getUsers } from '../../api/user/getUsers'
import { useFetchReducer } from '../../hooks/useFetch'
import { UserShort } from '../../types/UserShort'
import { TinyUserCard } from '../follows/UsersFollowed'
import { Loading } from '../common/Loading'
import { useFetchWithTimeout } from '../../hooks/useFetchWithTimeout'
import { FindUserByParam } from '../../api/user/FindUserByParam'
import { Box } from '@material-ui/core'

interface Props {
    searchParam: string
}

export const LastAccounts: React.FC<Props> = ({ searchParam }) => {
    const { data, error, loading: searchLoading } = useFetchWithTimeout({ fetchResource: FindUserByParam, param: searchParam, timeout: 500 })
    const { successData, errorMessage, loading } = useFetchReducer({ fetchCallback: getUsers })

    if (loading || searchLoading) {
        return <Loading></Loading>
    }

    if (successData) {
        const UsersArray = successData as UserShort[]
        return (
            <Box>
                {
                    searchParam ? <LastAccountsContainer usersArray={data} ></LastAccountsContainer> : <LastAccountsContainer usersArray={UsersArray} ></LastAccountsContainer>
                }
            </Box>
        )
    }

    if (errorMessage || error) {
        return (
            <div>
                {errorMessage && < div > {errorMessage}</div >}
                {error && <div>{error}</div>}
            </div>
        )
    }

    return null

}

interface LastAccountsContainerProps {
    usersArray: UserShort[],
}

const LastAccountsContainer: React.FC<LastAccountsContainerProps> = ({ usersArray }) => {

    return <Box>
        {usersArray.map((user: UserShort, idx: number) => {
            return <TinyUserCard
                avatar={user.profilePicture || ""}
                title={user.name + " " + user.surname}
                userId={user._id}
                key={idx}
            />
        })
        }
    </Box>
}