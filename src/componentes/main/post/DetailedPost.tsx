import React from 'react'
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../api/post/getPostById';
import { useFetchReducer } from '../../../hooks/useFetch';
import { Post } from './Post'
import { Post as IPost } from '../../../types/Post';
import { isPost } from '../../../types/typeguards/Post.typeguard';
import { CircularProgress } from '@material-ui/core';

interface IParams {
    postId: string
}

export const DetailedPost: React.FC = () => {
    const { postId } = useParams<IParams>()
    const { successData, errorMessage, loading } = useFetchReducer({ fetchCallback: getPostById, fetchOptions: { id: postId } })

    if (isPost(successData)) {
        return <Post post={successData} ></Post>
    }

    if (loading) {
        return <CircularProgress></CircularProgress>
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    return (
        null
    );
}
