import { SESSION_UPDATED } from '../actions/session'
import {
    FILTER_ACTIVITY_LIST,
    FETCHING_ACTIVITY_LIST_SUCCESS,
    FETCHING_ACTIVITY_LIST_FAILURE,
    getFilteredActivityList,
} from '../actions/activity'
import {
    FILTER_EDUCATION_LIST_DONE,
    FETCHING_EDUCATION_LIST_DONE,
    SORT_EDUCATION_TABLE_DONE,
    getFilteredEducationList,
} from '../actions/education'


export const sessionLocalStorage = store => next => (action) => {
    if (action.type === SESSION_UPDATED) {
        localStorage.setItem('session', JSON.stringify(store.getState().session))
    }
    next(action)
}

export const filterLists = store => next => (action) => {
    if (
        [FILTER_EDUCATION_LIST_DONE,
            FETCHING_EDUCATION_LIST_DONE,
            SORT_EDUCATION_TABLE_DONE].indexOf(action.type) > -1) {
        const { user } = store.getState().session
        const { educationList, controls, tableView } = store.getState().education
        store.dispatch(getFilteredEducationList(controls, educationList, user, tableView))
    }
    next(action)
}
