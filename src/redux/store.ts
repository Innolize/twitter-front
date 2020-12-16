import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducers from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'

const middlewares = [
    reduxThunk
]

export const store = createStore(reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
)