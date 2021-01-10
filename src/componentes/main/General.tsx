import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducer'
import { CrearComentario } from './CrearComentario'
import { Post } from './post/Post'
import { useFetchReducer } from '../../hooks/useFetch'
import { getPosts } from '../../api/post/getPosts'
import { CircularProgress } from '@material-ui/core'
import { isPostArray } from '../../types/typeguards/PostArray.typeguard'


export const General: React.FC = () => {
    const user = useSelector((state: RootState) => state.authReducer.user)
    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getPosts })

    if (loading) {
        return <CircularProgress />
    }

    if (successData) {
        console.log(successData)
        return (
            <>
                { user && <CrearComentario user={user} />}
                { isPostArray(successData) && successData.map((el, i) => <Post post={el} order={i} key={i} />)}
            </>
        )
    }

    return null

}

