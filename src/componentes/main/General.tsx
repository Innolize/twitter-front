import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducer'
import { CrearComentario } from './CrearComentario'
import { Post } from './post/Post'
import { Post as PostInterface } from './../../types/Post'

interface generalProps {

}



export const General: React.FC<generalProps> = ({ }) => {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const user = useSelector((state: RootState) => state.authReducer.user)

    useEffect(() => {
        const fetchPost = async () => {
            const data = await (await Axios('http://localhost:4000/post')).data

            setPosts(data)
        }
        fetchPost()
    }, [])

    console.log(posts)
    return (
        <>
            {user && <CrearComentario />}
            {posts && posts.map((el, i) => <Post post={el} key={i} />)}
        </>
    );
}

