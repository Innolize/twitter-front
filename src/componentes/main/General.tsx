import React, { useEffect, useState } from 'react'
import obtenerPostGenerales from '../../api/post/obtenerPostGenerales'

interface generalProps {

}



export const General: React.FC<generalProps> = ({ }) => {
    const [data, setData] = useState<any>("")

    useEffect(() => {
        const fetch = async () => {
            const resultado = await obtenerPostGenerales()
            setData(resultado)
        }
        fetch()
    }, [])

    if (data) {
        console.log(data)
    }

    return (
        <div>test</div>
    );
}

