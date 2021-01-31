import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducer'
import { CrearComentario } from './CrearComentario'
import { useFetchReducer } from '../../hooks/useFetch'
import { getPosts } from '../../api/post/getPosts'
import { CircularProgress } from '@material-ui/core'
import { isPostArray } from '../../types/typeguards/PostArray.typeguard'
import { PostContainer } from './post/PostContainer'

export const General: React.FC = () => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getPosts })

    if (loading) {
        return <CircularProgress />
    }

    if (successData) {
        const posts = successData
        return (
            <>
                { user && <CrearComentario user={user} />}
                { isPostArray(posts) && <PostContainer initialPosts={posts} ></PostContainer>}
            </>
        )
    }
    if (errorMessage) {
        return <div>error</div>
    }

    return null

}

