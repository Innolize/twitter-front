import React from 'react'
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../api/post/getPostById';
import { useFetchReducer } from '../../../hooks/useFetch';
import { Post } from './Post'
import { Post as IPost } from '../../../types/Post'
import { isPost } from '../../../types/typeguards/Post.typeguard';
import { Box } from '@material-ui/core';
import { CommentContainer } from '../comment/CommentContainer';
import { getComments } from '../../../api/comment/getComments';
import { Loading } from '../../common/Loading';
import { IComment } from '../../../types/Comment';

interface IParams {
    postId: string
}

export const DetailedPost: React.FC = () => {
    const param = useParams<IParams>()
    const responsePost = useFetchReducer({ fetchCallback: getPostById, fetchOptions: { id: param.postId } })
    const responseComments = useFetchReducer({ fetchCallback: getComments, fetchOptions: param.postId })

    if (responsePost.successData && responseComments.successData) {
        const post = responsePost.successData as IPost
        const comments = responseComments.successData as IComment[]
        return (
            <Box>
                {isPost(post) && <Post post={post} ></Post>}
                <CommentContainer postId={post._id} postComments={comments} ></CommentContainer>
            </Box>
        )
    }


    if (responsePost.errorMessage.length || responseComments.errorMessage.length) {
        return (
            <>
                <div>{responsePost.errorMessage}</div>
                <div>{responseComments.errorMessage}</div>
            </>
        )
    }

    if (responsePost.loading || responseComments.loading) {
        return <Loading size={40} ></Loading>
    }

    return null
}
