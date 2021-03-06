import { useEffect, useReducer } from "react"
import { ERROR, LOADING, SUCCESS, IinitialState, actions } from './useFetch.types'

const initialState = {
    successData: null,
    errorMessage: [],
    loading: false
}

const reducer = (state: IinitialState = initialState, action: actions): IinitialState => {
    switch (action.type) {

        case "SUCCESS":
            return { ...state, loading: false, successData: action.payload }

        case "ERROR":
            return { ...state, loading: false, errorMessage: [action.payload] }

        case "LOADING":
            return { ...state, loading: true }

        default:
            return state
    }
}


interface Props {
    fetchCallback: (options?: any) => Promise<any>,
    fetchOptions?: any
}

export const useFetchReducer = ({ fetchCallback, fetchOptions }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const customFecth = async () => {
            dispatch({ type: LOADING })
            try {
                const request = (await fetchCallback(fetchOptions))
                dispatch({ type: SUCCESS, payload: request })
            } catch (err) {
                dispatch({ type: ERROR, payload: err.response.data.message })
            }

        }
        customFecth()
        // eslint-disable-next-line
    }, [fetchCallback])

    return state
}