import { createStore } from 'redux'
import reducerTest from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(reducerTest,
    composeWithDevTools()
)