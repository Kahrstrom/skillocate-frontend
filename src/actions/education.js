import axios from 'axios'

import { ROOT_URL } from './index'
import { toggleContentDrawer } from './ui'

export const FETCHING_EDUCATION_LIST = 'FETCHING_EDUCATION_LIST'
export const FETCHING_EDUCATION_LIST_SUCCESS = 'FETCHING_EDUCATION_LIST_SUCCESS'
export const FETCHING_EDUCATION_LIST_FAILURE = 'FETCHING_EDUCATION_LIST_FAILURE'

export const FETCHING_EDUCATION_DETAILS = 'FETCHING_EDUCATION_DETAILS'
export const FETCHING_EDUCATION_DETAILS_SUCCESS = 'FETCHING_EDUCATION_DETAILS_SUCCESS'
export const FETCHING_EDUCATION_DETAILS_FAILURE = 'FETCHING_EDUCATION_DETAILS_FAILURE'
export const FETCHING_EDUCATION_LIST_DONE = 'FETCHING_EDUCATION_LIST_DONE'

export const FILTER_EDUCATION_LIST = 'FILTER_EDUCATION_LIST'
export const FILTER_EDUCATION_LIST_DONE = 'FILTER_EDUCATION_LIST_DONE'
export const GET_FILTERED_EDUCATION_LIST = 'GET_FILTERED_EDUCATION_LIST'

export const GET_EDUCATION_TYPES = 'GET_EDUCATION_TYPES'
export const GET_EDUCATION_TYPES_SUCCESS = 'GET_EDUCATION_TYPES_SUCCESS'
export const GET_EDUCATION_TYPES_FAILURE = 'GET_EDUCATION_TYPES_FAILURE'

export const SORT_EDUCATION_TABLE = 'SORT_EDUCATION_TABLE'
export const SORT_EDUCATION_TABLE_DONE = 'SORT_EDUCATION_TABLE_DONE'

export const NEW_EDUCATION = 'NEW_EDUCATION'
export const EDIT_EDUCATION = 'EDIT_EDUCATION'

export const SAVING_EDUCATION = 'SAVING_EDUCATION'
export const SAVING_EDUCATION_SUCCESS = 'SAVING_EDUCATION_SUCCESS'
export const SAVING_EDUCATION_FAILURE = 'SAVING_EDUCATION_FAILURE'

export const ERROR_SEEN = 'ERROR_SEEN'

const fetchingEducationList = () => {
    return {
        type: FETCHING_EDUCATION_LIST,
    }
}

const fetchingEducationListSuccess = (educationList) => {
    return {
        type: FETCHING_EDUCATION_LIST_SUCCESS,
        educationList,
    }
}

const fetchingEducationListFailure = (error) => {
    return {
        type: FETCHING_EDUCATION_LIST_SUCCESS,
        error,
    }
}

const fetchingEducationDetails = (id) => {
    return {
        type: FETCHING_EDUCATION_DETAILS,
        id,
    }
}

const fetchingEducationDetailsSuccess = (education) => {
    return {
        type: FETCHING_EDUCATION_DETAILS_SUCCESS,
        education,
    }
}

const fetchingEducationDetailsFailure = (error) => {
    return {
        type: FETCHING_EDUCATION_DETAILS_SUCCESS,
        error,
    }
}

const setFilterEducationList = (controls) => {
    return {
        type: FILTER_EDUCATION_LIST,
        controls,
    }
}

const savingEducation = () => {
    return {
        type: SAVING_EDUCATION,
    }
}

const savingEducationSuccess = (education) => {
    return {
        type: SAVING_EDUCATION_SUCCESS,
        education,
    }
}

const savingEducationFailure = (error) => {
    return {
        type: SAVING_EDUCATION_FAILURE,
        error,
    }
}

const getEducationTypesSuccess = (types) => {
    return {
        type: GET_EDUCATION_TYPES_SUCCESS,
        types,
    }
}

const getEducationTypesFailure = (error) => {
    return {
        type: GET_EDUCATION_TYPES_FAILURE,
        error,
    }
}


const fetchingEducationListDone = () => ({ type: FETCHING_EDUCATION_LIST_DONE })
const filterEductionListDone = () => ({ type: FILTER_EDUCATION_LIST_DONE })


const setSortEducationTable = (order, orderBy) => {
    return {
        type: SORT_EDUCATION_TABLE,
        order,
        orderBy,
    }
}
const setSortEducationTableDone = () => ({ type: SORT_EDUCATION_TABLE_DONE })

const getEducationListRequest = async (authToken) => {
    const url = `${ROOT_URL}/education/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })
    return response.data
}

const getEducationDetailsRequest = async (id, authToken) => {
    const url = `${ROOT_URL}/education/${id}/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })

    return response.data
}

const createEducationRequest = async (education, authToken) => {
    const url = `${ROOT_URL}/education/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.post(url, education, { headers })

    return response.data
}

// const setEducationTagsRequest = async (id, tags, authToken) => {
//     alert(JSON.stringify(tags))
//     const url = `${ROOT_URL}/education/${id}/tag/`
//     const headers = { Authorization: `Bearer ${authToken}` }
//     const response = await axios.post(url, tags, { headers })

//     return response.data
// }

const updateEducationRequest = async (education, authToken) => {
    const url = `${ROOT_URL}/education/${education._id}/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.put(url, education, { headers })

    return response.data
}

const getEducationTypesRequest = async (authToken) => {
    const url = `${ROOT_URL}/education/types`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })

    return response.data
}


export const fetchEducationList = (authToken) => {
    return async (dispatch) => {
        dispatch(fetchingEducationList())
        try {
            const types = await getEducationTypesRequest(authToken)
            dispatch(getEducationTypesSuccess(types))
        } catch (error) {
            dispatch(getEducationTypesFailure(error))
        }
        try {
            const response = await getEducationListRequest(authToken)
            dispatch(fetchingEducationListSuccess(response))
        } catch (error) {
            dispatch(fetchingEducationListFailure(error))
        }
        dispatch(fetchingEducationListDone())
    }
}


export const saveEducation = (education, authToken) => {
    return async (dispatch) => {
        dispatch(savingEducation())
        try {
            let response
            if (education._id) {
                response = await updateEducationRequest(education, authToken)
            } else {
                response = await createEducationRequest(education, authToken)
            }
            dispatch(savingEducationSuccess(response))
            dispatch(fetchEducationList(authToken))
            dispatch(toggleContentDrawer())
        } catch (error) {
            dispatch(savingEducationFailure(error))
        }
    }
}

export const fetchEducationDetails = (id, authToken) => {
    return async (dispatch) => {
        dispatch(fetchingEducationDetails())
        try {
            const response = await getEducationDetailsRequest(id, authToken)
            dispatch(fetchingEducationDetailsSuccess(response))
        } catch (error) {
            dispatch(fetchingEducationDetailsFailure(error))
        }
    }
}

export const getFilteredEducationList = (controls, educationList, user, tableView) => {
    const { filterOnlyMe, textFilter } = controls
    let filteredEducationList = educationList.filter((item) => {
        return filterOnlyMe ? item.user._id === user._id : true
    })
    filteredEducationList = filteredEducationList.filter((education) => {
        if (textFilter === '') {
            return true
        }
        const matches = Object.entries(education).filter((item) => {
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
    filteredEducationList = tableView.order === 'desc'
        ? filteredEducationList.sort((a, b) => (b[tableView.orderBy] < a[tableView.orderBy] ? -1 : 1))
        : filteredEducationList.sort((a, b) => (a[tableView.orderBy] < b[tableView.orderBy] ? -1 : 1))

    return {
        type: GET_FILTERED_EDUCATION_LIST,
        filteredEducationList,
    }
}

export const filterEducationList = (controls) => {
    return async (dispatch) => {
        dispatch(setFilterEducationList(controls))
        dispatch(filterEductionListDone())
    }
}

export const sortEducationTable = (oldValues, orderBy) => {
    return async (dispatch) => {
        let order = 'desc'

        if (oldValues.orderBy === orderBy && oldValues.order === 'desc') {
            order = 'asc'
        }
        dispatch(setSortEducationTable(order, orderBy))
        dispatch(setSortEducationTableDone())
    }
}

export const newEducation = () => {
    return async (dispatch) => {
        dispatch({ type: NEW_EDUCATION })
        dispatch(toggleContentDrawer())
    }
}

export const editEducation = (id, authToken) => {
    return async (dispatch) => {
        await dispatch(fetchEducationDetails(id, authToken))
        dispatch(toggleContentDrawer())
    }
}

export const errorSeen = () => {
    return {
        type: ERROR_SEEN,
    }
}
