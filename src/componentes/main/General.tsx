import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import obtenerPostGenerales from '../../api/post/obtenerPostGenerales'
import { RootState } from '../../redux/reducer'
import { InitialState } from '../../redux/reducer/authReducer'
import { CrearComentario } from './CrearComentario'
import { Post } from './post/Post'

interface generalProps {

}



export const General: React.FC<generalProps> = ({ }) => {
    const [data, setData] = useState<any>("")
    const user = useSelector((state: RootState) => state.authReducer.user)

    // useEffect(() => {
    //     const fetch = async () => {
    //         const resultado = await obtenerPostGenerales()
    //         setData(resultado)
    //     }
    //     fetch()
    // }, [])
    
    return (
        <>
            {user && <CrearComentario />}
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </>
    );
}

