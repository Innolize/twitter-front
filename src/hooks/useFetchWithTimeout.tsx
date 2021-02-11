import { useEffect, useReducer } from "react";
import { UserShort } from '../types/UserShort'

const initialState = {
    data: [],
    loading: false,
    error: null
}

interface InitialState {
    data: UserShort[]
    loading: boolean,
    error: null | string
}

const reducer = (state: InitialState = initialState, action: { type: string, payload?: any }) => {
    switch (action.type) {

        case "LOADING":
            return { ...state, loading: true }
        case "ERROR":
            return { ...state, loading: false, error: action.payload }
        case "SUCCESS":
            return { ...state, loading: false, data: action.payload }
        case "CLEAR_DATA":
            return { ...state, data: [] }

        default:
            return state
    }
}

interface HookProps {
    fetchResource: (param: string) => Promise<any>,
    param: string,
    timeout: number
}

export const useFetchWithTimeout = ({ fetchResource, param, timeout }: HookProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (param === "") {
                dispatch({ type: 'CLEAR_DATA' })
                return
            }
            dispatch({ type: 'LOADING' });
            try {
                const resource = await fetchResource(param);
                dispatch({ type: 'SUCCESS', payload: resource });
            } catch (error) {
                dispatch({ type: 'ERROR', payload: error });
            }
        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [fetchResource, param, timeout])

    return state
}
