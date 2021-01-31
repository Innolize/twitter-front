import React from 'react'
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../api/post/getPostById';
import { useFetchReducer } from '../../../hooks/useFetch';
import { Post } from './Post'
import { isPost } from '../../../types/typeguards/Post.typeguard';
import { Box, CircularProgress } from '@material-ui/core';
import { CommentContainer } from '../comment/CommentContainer';
import { getComments } from '../../../api/comment/getComments';
import { isCommentArray } from '../../../types/typeguards/CommentArray.typeguard';
import { CreateComment } from '../comment/CreateComment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';

interface IParams {
    postId: string
}

export const DetailedPost: React.FC = () => {
    const { postId } = useParams<IParams>()
    const user = useSelector((state: RootState) => state.authReducer.user)
    const responsePost = useFetchReducer({ fetchCallback: getPostById, fetchOptions: { id: postId } })
    const responseComments = useFetchReducer({ fetchCallback: getComments, fetchOptions: postId })

    if (responsePost.successData && responseComments.successData) {
        const post = responsePost.successData
        const comments = responseComments.successData
        return (
            <Box>
                {isPost(post) && <Post post={post} ></Post>}
                {isPost(post) && <CommentContainer postId={post._id} postComments={isCommentArray(comments) ? comments : []} ></CommentContainer>}
                {user && <CreateComment postId={postId} userId={user._id}></CreateComment>}
            </Box>
        )
    }


    if (responsePost.errorMessage || responseComments.errorMessage) {
        return (
            <>
                <div>{responsePost.errorMessage}</div>
                <div>{responseComments.errorMessage}</div>
            </>
        )
    }

    if (responsePost.loading || responseComments.loading) {
        return <CircularProgress></CircularProgress>
    }

    return (
        null
    );
}
