import React from 'react'
import { getPostByFollow } from '../../api/post/getPostByFollow'
import { useFetchReducer } from '../../hooks/useFetch'
import { Post as IPost } from '../../types/Post'
import { Loading } from '../common/Loading'
import { Post } from '../main/post/Post'


export const FollowPosts: React.FC = () => {
    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getPostByFollow })

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    if (loading) {
        return <Loading></Loading>
    }

    if (successData) {
        console.log(successData)
        const postArray = successData as IPost[]
        return (
            < div >
                { postArray.map(x => <Post post={x} key={x._id}></Post>)}
            </div >
        )
    }

    return null
}
