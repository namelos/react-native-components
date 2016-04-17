import { createStore, combineReducers, applyMiddleware, bindActionCreators, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { reducer as form } from 'redux-form'

/* --- */

export const createAction = type => payload =>
  ({ type, payload })

export const createReducer = (initialState = {}, handlers = {}) =>
  (state = initialState, action) =>
    handlers.hasOwnProperty(action.type) ?
      handlers[action.type](state, action.payload):
      state

const bindAsyncReducers = asyncReducers =>
  combineReducers({form, ...asyncReducers})

/* --- */

const renameHandlers = (namespace, handlers) => {
  const renamedHandlers = {}

  Object.keys(handlers).forEach(key => {
    if (key.indexOf('_') === -1)
      renamedHandlers[`${namespace}${key}`] = handlers[key]
    else
      renamedHandlers[key] = handlers[key]
  })

  Object.keys(renamedHandlers).forEach(key => {
    if (!renamedHandlers[key])
      renamedHandlers[key] = state => state
  })

  return renamedHandlers
}

const renameActions = (namespace, renamedHandlers) => {
  const actions = {}

  Object.keys(renamedHandlers).forEach(actionType => {
    const action = createAction(actionType)

    if (actionType.startsWith(namespace))
      actions[actionType.replace(namespace, '')] = action

    actions[actionType] = action
  })

  return actions
}

export const createDecorator = store =>
  (reducerName, initialState = {}, handlers = {}) => {
    const namespace = `${reducerName}_`

    const renamedHandlers = renameHandlers(namespace, handlers)
    const actions = renameActions(namespace, renamedHandlers)

    store.addReducer(reducerName, createReducer(initialState, renamedHandlers))

    return connect(
      state => state,
      dispatch => bindActionCreators(actions, dispatch)
    )
  }

/* --- */

export const configureStore = (...enhancers) => {
  const store = enhancers ?
    compose(...enhancers)(createStore)(bindAsyncReducers()) :
    createStore(bindAsyncReducers())

  store.asyncReducers = {}

  store.addReducer = (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(bindAsyncReducers(store.asyncReducers))
  }

  return store
}