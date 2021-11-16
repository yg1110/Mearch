import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { productReducer } from '../Reducer'

export const store = createStore(productReducer, applyMiddleware(ReduxThunk))
