import axios from 'axios'
import { ROOT_URL } from './index'

export const FETCHING_ACTIVITY_LIST = 'FETCHING_ACTIVITY_LIST'
export const FETCHING_ACTIVITY_LIST_SUCCESS = 'FETCHING_ACTIVITY_LIST_SUCCESS'
export const FETCHING_ACTIVITY_LIST_FAILURE = 'FETCHING_ACTIVITY_LIST_FAILURE'

export const FETCHING_ACTIVITY_DETAILS = 'FETCHING_ACTIVITY_DETAILS'
export const FETCHING_ACTIVITY_DETAILS_SUCCESS = 'FETCHING_ACTIVITY_DETAILS_SUCCESS'
export const FETCHING_ACTIVITY_DETAILS_FAILURE = 'FETCHING_ACTIVITY_DETAILS_FAILURE'

export const FILTER_ACTIVITY_LIST = 'FILTER_ACTIVITY_LIST'
export const GET_FILTERED_ACTIVITY_LIST = 'GET_FILTERED_ACTIVITY_LIST'

const fetchingActivityList = () => {
    return {
        type: FETCHING_ACTIVITY_LIST,
    }
}

const fetchingActivityListSuccess = (activityList) => {
    return {
        type: FETCHING_ACTIVITY_LIST_SUCCESS,
        activityList,
    }
}

const fetchingActivityListFailure = (error) => {
    return {
        type: FETCHING_ACTIVITY_LIST_SUCCESS,
        error,
    }
}

const fetchingActivityDetails = (id) => {
    return {
        type: FETCHING_ACTIVITY_DETAILS,
        id,
    }
}

const fetchingActivityDetailsSuccess = (activity) => {
    return {
        type: FETCHING_ACTIVITY_DETAILS_SUCCESS,
        activity,
    }
}

const fetchingActivityDetailsFailure = (error) => {
    return {
        type: FETCHING_ACTIVITY_DETAILS_SUCCESS,
        error,
    }
}


const getActivityListRequest = async (authToken) => {
    const url = `${ROOT_URL}/activity/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })
    return response.data
}

const getActivityDetailsRequest = async (id, authToken) => {
    const url = `${ROOT_URL}/activity/${id}/`
    const headers = { Authorization: `Bearer ${authToken}` }
    const response = await axios.get(url, { headers })

    return response.data
}

export const fetchActivityList = (authToken) => {
    return async (dispatch) => {
        dispatch(fetchingActivityList())
        try {
            const response = await getActivityListRequest(authToken)
            dispatch(fetchingActivityListSuccess(response))
        } catch (error) {
            dispatch(fetchingActivityListFailure(error))
        }
    }
}

export const fetchActivityDetails = (id, authToken) => {
    return async (dispatch) => {
        dispatch(fetchingActivityDetails())

        try {
            const response = await getActivityDetailsRequest(id, authToken)
            dispatch(fetchingActivityDetailsSuccess(response))
        } catch (error) {
            dispatch(fetchingActivityDetailsFailure(error))
        }
    }
}

// export const getFilteredActivityList = (controls, activityList, user) => {
//     const { filterOnlyMe, textFilter } = controls
//     let filteredActivityList = activityList.filter((item) => {
//         return filterOnlyMe ? item.user._id === user.id : true
//     })
//     filteredActivityList = filteredActivityList.filter((activity) => {
//         if (textFilter === '') {
//             return true
//         }
//         let retval = false
//         Object.entries(activity).forEach((item) => {
//             if (item.indexOf(textFilter) > -1) {
//                 retval = true
//             }
//         })
//         return retval
//     })
//     return {
//         type: GET_FILTERED_ACTIVITY_LIST,
//         filteredActivityList,
//     }
// }

// export const filterActivityList = (controls) => {
//     return {
//         type: FILTER_ACTIVITY_LIST,
//         controls,
//     }
// }
