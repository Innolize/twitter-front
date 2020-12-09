import axios from 'axios'

const obtenerPost = async () => {
    const respuesta = await axios("http://localhost:4000/post")
    return respuesta.data
}

export default obtenerPost