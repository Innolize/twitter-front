import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import obtenerPostGenerales from '../../api/post/obtenerPostGenerales'
import { InitialState } from '../../redux/reducer/authReducer'
import { CrearComentario } from './CrearComentario'
import { Post } from './post/Post'

interface generalProps {

}



export const General: React.FC<generalProps> = ({ }) => {
    const [data, setData] = useState<any>("")
    const user = useSelector((state: InitialState) => state.user)

    // useEffect(() => {
    //     const fetch = async () => {
    //         const resultado = await obtenerPostGenerales()
    //         setData(resultado)
    //     }
    //     fetch()
    // }, [])

    if (data) {
        console.log(data)
    }

    return (
        <>
            {user && <CrearComentario />}
            <Post />
            <Post />
        </>
    );
}

