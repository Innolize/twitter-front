import React from 'react'
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../api/post/getPostById';
import { useFetchReducer } from '../../../hooks/useFetch';
import { Post } from './Post';

interface IParams {
    postId: string
}

export const DetailedPost: React.FC = () => {
    const { postId } = useParams<IParams>()
    const { successData, errorMessage, loading } = useFetchReducer({ fetchCallback: getPostById, fetchOptions: { id: postId } })



    return (
        <>
            {successData && console.log(successData)}
            {/* <Post post={ }></Post> */}
        </>
    );
}
