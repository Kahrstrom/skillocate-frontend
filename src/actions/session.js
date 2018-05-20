import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { ROOT_URL } from './index'

export const LOGGING_IN = 'LOGGING_IN'
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCES'
export const LOGGING_IN_FAILURE = 'LOGGING_IN_FAILURE'

export const REGISTERING = 'REGISTERING'
export const REGISTERING_SUCCESS = 'REGISTERING_SUCCESS'
export const REGISTERING_FAILURE = 'REGISTERING_FAILURE'

export const LOGGING_OUT = 'LOGGING_OUT'
export const LOGGING_OUT_SUCCESS = 'LOGGING_OUT_SUCCES'
export const LOGGING_OUT_FAILURE = 'LOGGING_OUT_FAILURE'
export const SESSION_UPDATED = 'SESSION_UPDATED'

const loggingOut = (email) => {
    return {
        type: LOGGING_OUT,
        email,
    }
}

const loggingOutSuccess = (session) => {
    return {
        type: LOGGING_OUT_SUCCESS,
        session,
    }
}

const loggingOutFailure = (error) => {
    return {
        type: LOGGING_OUT_FAILURE,
        error,
    }
}

const loggingIn = (username, account) => {
    return {
        type: LOGGING_IN,
        username,
        account,
    }
}

const loggingInSuccess = (session) => {
    return {
        type: LOGGING_IN_SUCCESS,
        session,
    }
}

const loggingInFailure = (error) => {
    return {
        type: LOGGING_IN_FAILURE,
        error,
    }
}

const sessionUpdated = () => {
    return {
        type: SESSION_UPDATED,
    }
}

const registering = (username, account) => {
    return {
        type: REGISTERING,
        username,
        account,
    }
}

const registeringSuccess = (session) => {
    return {
        type: REGISTERING_SUCCESS,
        session,
    }
}

const registeringFailure = (error) => {
    return {
        type: REGISTERING_FAILURE,
        error,
    }
}

const loginRequest = async (params) => {
    const url = `${ROOT_URL}/auth/login/`
    const response = await axios.post(url, params)

    return response.data
}

const registerRequest = async (params) => {
    const url = `${ROOT_URL}/auth/register/`
    const response = await axios.post(url, params)

    return response.data
}

const logoutRequest = async (authToken) => {
    const url = `${ROOT_URL}/auth/logout/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.post(url, {}, { headers })

    return response.data
}

export const logIn = (data) => {
    return async (dispatch) => {
        const { email = '' } = data
        dispatch(loggingIn(email))

        try {
            const response = await loginRequest(data)
            dispatch(loggingInSuccess(response))
            dispatch(sessionUpdated())
            dispatch(push('/'))
        } catch (error) {
            dispatch(loggingInFailure(error))
            throw new SubmissionError({
                _error: 'Register',
            })
        }
    }
}

export const register = (data) => {
    return async (dispatch) => {
        const { email = '' } = data
        dispatch(registering(email))
        try {
            const response = await registerRequest(data)
            dispatch(registeringSuccess(response))
        } catch (error) {
            dispatch(registeringFailure(error))
        }
    }
}

export const logOut = (authToken) => {
    return async (dispatch) => {
        dispatch(loggingOut(authToken))
        try {
            const response = await logoutRequest(authToken)
            dispatch(loggingOutSuccess(response))
        } catch (error) {
            dispatch(loggingOutFailure(error))
        }
        dispatch(sessionUpdated())
        dispatch(push('/'))
    }
}
