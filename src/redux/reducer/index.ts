const initialState = {
    test: "test"
}

type Action = {
    type: string,
    payload: string
}

const reducerTest = (state = initialState, { type, payload }: Action) => {
    switch (type) {

        case "TEST":
            return { ...state, test: payload }

        default:
            return state
    }
}

export default reducerTest