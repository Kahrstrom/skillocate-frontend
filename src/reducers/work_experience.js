import moment from 'moment'
import {
    FETCHING_WORK_EXPERIENCE_LIST,
    FETCHING_WORK_EXPERIENCE_LIST_SUCCESS,
    FETCHING_WORK_EXPERIENCE_LIST_FAILURE,
    FETCHING_WORK_EXPERIENCE_DETAILS,
    FETCHING_WORK_EXPERIENCE_DETAILS_SUCCESS,
    FETCHING_WORK_EXPERIENCE_DETAILS_FAILURE,
    FILTER_WORK_EXPERIENCE_LIST,
    GET_FILTERED_WORK_EXPERIENCE_LIST,
    SORT_WORK_EXPERIENCE_TABLE,
    NEW_WORK_EXPERIENCE,
    EDIT_WORK_EXPERIENCE,
    SAVING_WORK_EXPERIENCE,
    SAVING_WORK_EXPERIENCE_FAILURE,
    SAVING_WORK_EXPERIENCE_SUCCESS,
    GET_WORK_EXPERIENCE_TYPES_SUCCESS,
    GET_WORK_EXPERIENCE_TYPES_FAILURE,
    ERROR_SEEN,
} from '../actions/work_experience'

const emptyWorkExperienceDetails = {
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
    workExperienceDetails: emptyWorkExperienceDetails,
    workExperienceList: [],
    filteredWorkExperienceList: [],
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
    case FETCHING_WORK_EXPERIENCE_LIST:
        return {
            ...state,
            workExperienceList: [],
            error: '',
            loading: true,
        }
    case FETCHING_WORK_EXPERIENCE_LIST_SUCCESS:
        return {
            ...state,
            workExperienceList: action.workExperienceList.data,
            error: '',
            loading: false,
        }
    case FETCHING_WORK_EXPERIENCE_LIST_FAILURE:
        return {
            ...state,
            workExperienceList: [],
            error: action.error,
            loading: false,
        }
    case FETCHING_WORK_EXPERIENCE_DETAILS:
        return {
            ...state,
            workExperienceDetails: emptyWorkExperienceDetails,
            error: '',
            loading: true,
        }
    case FETCHING_WORK_EXPERIENCE_DETAILS_SUCCESS: {
        const { startdate, enddate } = action.workExperience.data
        return {
            ...state,
            workExperienceDetails: {
                ...action.work_experience.data,
                enddate: enddate ? moment(enddate).format('YYYY-MM-DD') : null,
                startdate: startdate ? moment(startdate).format('YYYY-MM-DD') : null,
            },
            error: '',
            loading: false,
        }
    }
    case FETCHING_WORK_EXPERIENCE_DETAILS_FAILURE:
        return {
            workExperienceDetails: {},
            workExperienceList: state.workExperienceList,
            error: action.error,
            loading: false,
        }
    case FILTER_WORK_EXPERIENCE_LIST:
        return {
            ...state,
            controls: action.controls,
        }
    case GET_FILTERED_WORK_EXPERIENCE_LIST:
        return {
            ...state,
            filteredWorkExperienceList: action.filteredWorkExperienceList,
        }
    case NEW_WORK_EXPERIENCE:
        return {
            ...state,
            workExperienceDetails: emptyWorkExperienceDetails,
        }
    case EDIT_WORK_EXPERIENCE:
        return {
            ...state,
            workExperienceDetails: action.workExperienceDetails,
        }
    case SAVING_WORK_EXPERIENCE:
        return {
            ...state,
            loading: true,
            error: '',
        }
    case SAVING_WORK_EXPERIENCE_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    case SAVING_WORK_EXPERIENCE_SUCCESS:
        return {
            ...state,
            loading: false,
            error: '',
            workExperienceDetails: action.workExperience.data,
        }
    case SORT_WORK_EXPERIENCE_TABLE:
        return {
            ...state,
            tableView: {
                ...state.tableView,
                order: action.order,
                orderBy: action.orderBy,
            },
        }
    case GET_WORK_EXPERIENCE_TYPES_SUCCESS:
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
