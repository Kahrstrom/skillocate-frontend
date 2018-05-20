import {
    FETCHING_ACTIVITY_LIST,
    FETCHING_ACTIVITY_LIST_SUCCESS,
    FETCHING_ACTIVITY_LIST_FAILURE,
    FETCHING_ACTIVITY_DETAILS,
    FETCHING_ACTIVITY_DETAILS_SUCCESS,
    FETCHING_ACTIVITY_DETAILS_FAILURE,
    FILTER_ACTIVITY_LIST,
    GET_FILTERED_ACTIVITY_LIST,
} from '../actions/activity'

const INITIAL_STATE = {
    activityDetails: {},
    activityList: [],
    filteredActivityList: [],
    error: '',
    loading: false,
    controls: {
        filterOnlyMe: false,
        textFilter: '',
    },
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FETCHING_ACTIVITY_LIST:
        return {
            ...state,
            activityList: [],
            error: '',
            loading: true,
        }
    case FETCHING_ACTIVITY_LIST_SUCCESS:
        console.log({
            ...state,
            activityList: action.activityList.data,
            error: '',
            loading: false,
        })
        return {
            ...state,
            activityList: action.activityList.data,
            error: '',
            loading: false,
        }
    case FETCHING_ACTIVITY_LIST_FAILURE:
        return {
            ...state,
            activityList: [],
            error: action.error,
            loading: false,
        }
    case FETCHING_ACTIVITY_DETAILS:
        return {
            ...state,
            activityDetails: {},
            error: '',
            loading: true,
        }
    case FETCHING_ACTIVITY_DETAILS_SUCCESS:
        return {
            ...state,
            activityDetails: action.data.activity,
            error: '',
            loading: false,
        }
    case FETCHING_ACTIVITY_DETAILS_FAILURE:
        return {
            ...state,
            activityDetails: {},
            error: action.error,
            loading: false,
        }
    case FILTER_ACTIVITY_LIST:
        return {
            ...state,
            controls: action.controls,
        }
    case GET_FILTERED_ACTIVITY_LIST:
        return {
            ...state,
            filteredActivityList: action.filteredActivityList,
        }
    default:
        return state
    }
}
