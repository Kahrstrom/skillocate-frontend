import {
    LOGGING_IN,
    LOGGING_IN_SUCCESS,
    LOGGING_IN_FAILURE,
    LOGGING_OUT,
    LOGGING_OUT_FAILURE,
    LOGGING_OUT_SUCCESS,
    REGISTERING,
    REGISTERING_FAILURE,
    REGISTERING_SUCCESS,
} from '../actions/session'

const INITIAL_STATE = {
    user: {},
    authToken: '',
    error: '',
    valid: false,
    loading: false,
}

const getInitialState = () => {
    const state = JSON.parse(localStorage.getItem('session'))
    return state || INITIAL_STATE
}

export default function (state = getInitialState(), action) {
    switch (action.type) {
    case LOGGING_IN:
        return {
            ...state,
            user: {},
            authToken: '',
            error: '',
            valid: false,
            loading: true,
        }
    case LOGGING_IN_SUCCESS:
        return {
            ...state,
            user: action.session.data,
            authToken: action.session.data.auth_token,
            error: '',
            valid: true,
            loading: false,
        }
    case LOGGING_IN_FAILURE:
        return {
            ...state,
            error: action.error,
            valid: false,
            loading: false,
        }
    case LOGGING_OUT:
        return {
            ...state,
            error: '',
            valid: false,
            loading: true,
        }
    case LOGGING_OUT_SUCCESS:
        return {
            ...state,
            user: {},
            authToken: '',
            error: '',
            valid: false,
            loading: false,
        }
    case LOGGING_OUT_FAILURE:
        return {
            ...state,
            user: {},
            authToken: '',
            error: action.error,
            valid: false,
            loading: false,
        }
    case REGISTERING:
        return {
            ...state,
            user: {},
            authToken: '',
            error: '',
            valid: false,
            loading: true,
        }

    case REGISTERING_SUCCESS:
        return {
            ...state,
            user: action.session.user,
            authToken: action.session.authToken,
            error: action.error,
            valid: true,
            loading: false,
        }
    case REGISTERING_FAILURE:
        return {
            ...state,
            user: {},
            token: '',
            error: action.error,
            valid: false,
            loading: false,
        }
    default:
        return state
    }
}
