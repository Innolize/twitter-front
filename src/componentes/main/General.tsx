import React, { useEffect, useState } from 'react'
import obtenerPostGenerales from '../../api/post/obtenerPostGenerales'
import { Post } from './post/Post'

interface generalProps {

}



export const General: React.FC<generalProps> = ({ }) => {
    const [data, setData] = useState<any>("")

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
            <Post />
            <Post />
        </>
    );
}

