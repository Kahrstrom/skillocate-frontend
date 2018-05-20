import axios from 'axios'
import { push } from 'react-router-redux'

import { ROOT_URL } from './index'
import { toggleContentDrawer } from './ui'

export const FETCHING_WORK_EXPERIENCE_LIST = 'FETCHING_WORK_EXPERIENCE_LIST'
export const FETCHING_WORK_EXPERIENCE_LIST_SUCCESS = 'FETCHING_WORK_EXPERIENCE_LIST_SUCCESS'
export const FETCHING_WORK_EXPERIENCE_LIST_FAILURE = 'FETCHING_WORK_EXPERIENCE_LIST_FAILURE'

export const FETCHING_WORK_EXPERIENCE_DETAILS = 'FETCHING_WORK_EXPERIENCE_DETAILS'
export const FETCHING_WORK_EXPERIENCE_DETAILS_SUCCESS = 'FETCHING_WORK_EXPERIENCE_DETAILS_SUCCESS'
export const FETCHING_WORK_EXPERIENCE_DETAILS_FAILURE = 'FETCHING_WORK_EXPERIENCE_DETAILS_FAILURE'
export const FETCHING_WORK_EXPERIENCE_LIST_DONE = 'FETCHING_WORK_EXPERIENCE_LIST_DONE'

export const FILTER_WORK_EXPERIENCE_LIST = 'FILTER_WORK_EXPERIENCE_LIST'
export const FILTER_WORK_EXPERIENCE_LIST_DONE = 'FILTER_WORK_EXPERIENCE_LIST_DONE'
export const GET_FILTERED_WORK_EXPERIENCE_LIST = 'GET_FILTERED_WORK_EXPERIENCE_LIST'

export const GET_WORK_EXPERIENCE_TYPES = 'GET_WORK_EXPERIENCE_TYPES'
export const GET_WORK_EXPERIENCE_TYPES_SUCCESS = 'GET_WORK_EXPERIENCE_TYPES_SUCCESS'
export const GET_WORK_EXPERIENCE_TYPES_FAILURE = 'GET_WORK_EXPERIENCE_TYPES_FAILURE'

export const SORT_WORK_EXPERIENCE_TABLE = 'SORT_WORK_EXPERIENCE_TABLE'
export const SORT_WORK_EXPERIENCE_TABLE_DONE = 'SORT_WORK_EXPERIENCE_TABLE_DONE'

export const NEW_WORK_EXPERIENCE = 'NEW_WORK_EXPERIENCE'
export const EDIT_WORK_EXPERIENCE = 'EDIT_WORK_EXPERIENCE'

export const SAVING_WORK_EXPERIENCE = 'SAVING_WORK_EXPERIENCE'
export const SAVING_WORK_EXPERIENCE_SUCCESS = 'SAVING_WORK_EXPERIENCE_SUCCESS'
export const SAVING_WORK_EXPERIENCE_FAILURE = 'SAVING_WORK_EXPERIENCE_FAILURE'

export const ERROR_SEEN = 'ERROR_SEEN'

const fetchingWorkExperienceList = () => {
    return {
        type: FETCHING_WORK_EXPERIENCE_LIST,
    }
}

const fetchingWorkExperienceListSuccess = (workExperienceList) => {
    return {
        type: FETCHING_WORK_EXPERIENCE_LIST_SUCCESS,
        workExperienceList,
    }
}

const fetchingWorkExperienceListFailure = (error) => {
    return {
        type: FETCHING_WORK_EXPERIENCE_LIST_SUCCESS,
        error,
    }
}

const fetchingWorkExperienceDetails = (id) => {
    return {
        type: FETCHING_WORK_EXPERIENCE_DETAILS,
        id,
    }
}

const fetchingWorkExperienceDetailsSuccess = (workExperience) => {
    return {
        type: FETCHING_WORK_EXPERIENCE_DETAILS_SUCCESS,
        workExperience,
    }
}

const fetchingWorkExperienceDetailsFailure = (error) => {
    return {
        type: FETCHING_WORK_EXPERIENCE_DETAILS_SUCCESS,
        error,
    }
}

const setFilterWorkExperienceList = (controls) => {
    return {
        type: FILTER_WORK_EXPERIENCE_LIST,
        controls,
    }
}

const savingWorkExperience = () => {
    return {
        type: SAVING_WORK_EXPERIENCE,
    }
}

const savingWorkExperienceSuccess = (workExperience) => {
    return {
        type: SAVING_WORK_EXPERIENCE_SUCCESS,
        workExperience,
    }
}

const savingWorkExperienceFailure = (error) => {
    return {
        type: SAVING_WORK_EXPERIENCE_FAILURE,
        error,
    }
}

const getWorkExperienceTypesSuccess = (types) => {
    return {
        type: GET_WORK_EXPERIENCE_TYPES_SUCCESS,
        types,
    }
}

const getWorkExperienceTypesFailure = (error) => {
    return {
        type: GET_WORK_EXPERIENCE_TYPES_FAILURE,
        error,
    }
}


const fetchingWorkExperienceListDone = () => ({ type: FETCHING_WORK_EXPERIENCE_LIST_DONE })
const filterEductionListDone = () => ({ type: FILTER_WORK_EXPERIENCE_LIST_DONE })


const setSortWorkExperienceTable = (order, orderBy) => {
    return {
        type: SORT_WORK_EXPERIENCE_TABLE,
        order,
        orderBy,
    }
}
const setSortWorkExperienceTableDone = () => ({ type: SORT_WORK_EXPERIENCE_TABLE_DONE })

const getWorkExperienceListRequest = async (authToken) => {
    const url = `${ROOT_URL}/workexperience/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })
    return response.data
}

const getWorkExperienceDetailsRequest = async (id, authToken) => {
    const url = `${ROOT_URL}/workexperience/${id}/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })

    return response.data
}

const createWorkExperienceRequest = async (workExperience, authToken) => {
    const url = `${ROOT_URL}/workexperience/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.post(url, workExperience, { headers })

    return response.data
}

const updateWorkExperienceRequest = async (workExperience, authToken) => {
    const url = `${ROOT_URL}/workexperience/${workExperience._id}/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.put(url, workExperience, { headers })

    return response.data
}

const getWorkExperienceTypesRequest = async (authToken) => {
    const url = `${ROOT_URL}/workexperience/types`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })

    return response.data
}

export const saveWorkExperience = (workExperience, authToken) => {
    return async (dispatch) => {
        dispatch(savingWorkExperience())
        try {
            let response
            if (workExperience._id) {
                response = await updateWorkExperienceRequest(workExperience, authToken)
            } else {
                response = await createWorkExperienceRequest(workExperience, authToken)
            }
            dispatch(savingWorkExperienceSuccess(response))
        } catch (error) {
            dispatch(savingWorkExperienceFailure(error))
        }
    }
}

export const fetchWorkExperienceList = (authToken) => {
    return async (dispatch) => {
        dispatch(fetchingWorkExperienceList())
        try {
            const types = await getWorkExperienceTypesRequest(authToken)
            dispatch(getWorkExperienceTypesSuccess(types))
        } catch (error) {
            dispatch(getWorkExperienceTypesFailure(error))
        }
        try {
            const response = await getWorkExperienceListRequest(authToken)
            dispatch(fetchingWorkExperienceListSuccess(response))
        } catch (error) {
            dispatch(fetchingWorkExperienceListFailure(error))
        }
        dispatch(fetchingWorkExperienceListDone())
    }
}

export const fetchWorkExperienceDetails = (id, authToken) => {
    return async (dispatch) => {
        dispatch(fetchingWorkExperienceDetails())
        try {
            const response = await getWorkExperienceDetailsRequest(id, authToken)
            dispatch(fetchingWorkExperienceDetailsSuccess(response))
        } catch (error) {
            dispatch(fetchingWorkExperienceDetailsFailure(error))
        }
    }
}

export const getFilteredWorkExperienceList = (controls, workExperienceList, user, tableView) => {
    const { filterOnlyMe, textFilter } = controls
    let filteredWorkExperienceList = workExperienceList.filter((item) => {
        return filterOnlyMe ? item.user._id === user._id : true
    })
    filteredWorkExperienceList = filteredWorkExperienceList.filter((workExperience) => {
        if (textFilter === '') {
            return true
        }
        const matches = Object.entries(workExperience).filter((item) => {
            if (!item[1]) {
                return false
            }
            if (String(item[1]).toLowerCase().indexOf(textFilter.toLowerCase()) === -1) {
                return false
            }
            return true
        })
        return matches.length > 0
    })
    filteredWorkExperienceList = tableView.order === 'desc'
        ? filteredWorkExperienceList.sort((a, b) => (b[tableView.orderBy] < a[tableView.orderBy] ? -1 : 1))
        : filteredWorkExperienceList.sort((a, b) => (a[tableView.orderBy] < b[tableView.orderBy] ? -1 : 1))

    return {
        type: GET_FILTERED_WORK_EXPERIENCE_LIST,
        filteredWorkExperienceList,
    }
}

export const filterWorkExperienceList = (controls) => {
    return async (dispatch) => {
        dispatch(setFilterWorkExperienceList(controls))
        dispatch(filterEductionListDone())
    }
}

export const sortWorkExperienceTable = (oldValues, orderBy) => {
    return async (dispatch) => {
        let order = 'desc'

        if (oldValues.orderBy === orderBy && oldValues.order === 'desc') {
            order = 'asc'
        }
        dispatch(setSortWorkExperienceTable(order, orderBy))
        dispatch(setSortWorkExperienceTableDone())
    }
}


export const newWorkExperience = () => {
    return async (dispatch) => {
        dispatch({ type: NEW_WORK_EXPERIENCE })
        dispatch(toggleContentDrawer())
    }
}

export const editWorkExperience = (id, authToken) => {
    return async (dispatch) => {
        await dispatch(fetchWorkExperienceDetails(id, authToken))
        dispatch(toggleContentDrawer())
    }
}

export const errorSeen = () => {
    return {
        type: ERROR_SEEN,
    }
}
