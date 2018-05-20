import moment from 'moment'
import {
    FETCHING_EDUCATION_LIST,
    FETCHING_EDUCATION_LIST_SUCCESS,
    FETCHING_EDUCATION_LIST_FAILURE,
    FETCHING_EDUCATION_DETAILS,
    FETCHING_EDUCATION_DETAILS_SUCCESS,
    FETCHING_EDUCATION_DETAILS_FAILURE,
    FILTER_EDUCATION_LIST,
    GET_FILTERED_EDUCATION_LIST,
    SORT_EDUCATION_TABLE,
    NEW_EDUCATION,
    EDIT_EDUCATION,
    SAVING_EDUCATION,
    SAVING_EDUCATION_FAILURE,
    SAVING_EDUCATION_SUCCESS,
    GET_EDUCATION_TYPES_SUCCESS,
    GET_EDUCATION_TYPES_FAILURE,
    ERROR_SEEN,
} from '../actions/education'

const emptyEducationDetails = {
    title: '',
    school: '',
    extent: '',
    description: '',
    startdate: null,
    enddate: null,
    type: '',
    tags: [],
    highlight: false,
    types: [],
}

const INITIAL_STATE = {
    educationDetails: emptyEducationDetails,
    educationList: [],
    filteredEducationList: [],
    controls: {
        filterOnlyMe: true,
        textFilter: '',
    },
    tableView: {
        order: 'desc',
        orderBy: 'enddate',
    },
    error: '',
    loading: false,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FETCHING_EDUCATION_LIST:
        return {
            ...state,
            educationList: [],
            error: '',
            loading: true,
        }
    case FETCHING_EDUCATION_LIST_SUCCESS:
        return {
            ...state,
            educationList: action.educationList.data,
            error: '',
            loading: false,
        }
    case FETCHING_EDUCATION_LIST_FAILURE:
        return {
            ...state,
            educationList: [],
            error: action.error,
            loading: false,
        }
    case FETCHING_EDUCATION_DETAILS:
        return {
            ...state,
            educationDetails: emptyEducationDetails,
            error: '',
            loading: true,
        }
    case FETCHING_EDUCATION_DETAILS_SUCCESS: {
        const { startdate, enddate } = action.education.data
        return {
            ...state,
            educationDetails: {
                ...action.education.data,
                enddate: enddate ? moment(enddate).format('YYYY-MM-DD') : null,
                startdate: startdate ? moment(startdate).format('YYYY-MM-DD') : null,
            },
            error: '',
            loading: false,
        }
    }
    case FETCHING_EDUCATION_DETAILS_FAILURE:
        return {
            educationDetails: {},
            educationList: state.educationList,
            error: action.error,
            loading: false,
        }
    case FILTER_EDUCATION_LIST:
        return {
            ...state,
            controls: action.controls,
        }
    case GET_FILTERED_EDUCATION_LIST:
        return {
            ...state,
            filteredEducationList: action.filteredEducationList,
        }
    case NEW_EDUCATION:
        return {
            ...state,
            educationDetails: emptyEducationDetails,
        }
    case EDIT_EDUCATION:
        return {
            ...state,
            educationDetails: action.educationDetails,
        }
    case SAVING_EDUCATION:
        return {
            ...state,
            loading: true,
            error: '',
        }
    case SAVING_EDUCATION_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    case SAVING_EDUCATION_SUCCESS:
        return {
            ...state,
            loading: false,
            error: '',
            educationDetails: action.education.data,
        }
    case SORT_EDUCATION_TABLE:
        return {
            ...state,
            tableView: {
                ...state.tableView,
                order: action.order,
                orderBy: action.orderBy,
            },
        }
    case GET_EDUCATION_TYPES_SUCCESS:
        return {
            ...state,
            types: action.types.data,
        }
    case ERROR_SEEN:
        return {
            ...state,
            error: '',
        }
    default:
        return state
    }
}
