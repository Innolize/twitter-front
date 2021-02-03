import React, { useEffect, useState } from 'react'
import { getPostByFollow } from '../../api/post/getPostByFollow'
import { Post as IPost } from '../../types/Post'
import { Post } from '../main/post/Post'
interface Props {

}

export const FollowPosts: React.FC<Props> = () => {
    const [postArray, setPostArray] = useState<IPost[]>([])

    useEffect(() => {
        const obtainPosts = async () => {
            try {
                const response = await getPostByFollow()
                setPostArray(response)
            } catch (err) {
                console.log(err)
            }
        }
        obtainPosts()
    }, [])


    return (
        <div>
            {postArray.length && postArray.map(x => <Post post={x} key={x._id}></Post>)}
        </div >
    )
}
