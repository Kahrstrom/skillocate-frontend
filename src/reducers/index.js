import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import session from './session'
import language from './language'
import activity from './activity'
import education from './education'
import ui from './ui'

const rootReducer = combineReducers({
    session,
    language,
    form: formReducer,
    routerReducer,
    activity,
    education,
    ui,
})

export default rootReducer
