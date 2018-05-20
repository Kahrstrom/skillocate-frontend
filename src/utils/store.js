import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers'
import { sessionLocalStorage, filterLists } from '../middleware'

const loggerMiddleware = createLogger()
export const history = createHistory()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        sessionLocalStorage,
        filterLists,
        routerMiddleware(history),
    ),
)

export default store
