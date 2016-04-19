import { applyMiddleware } from 'redux'
import { configureStore, createDecorator } from './store/index'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

export const store = configureStore(applyMiddleware(thunk, logger()))
export const module = createDecorator(store)
