import {
    TOGGLE_NAVDRAWER_MOBILE,
    TOGGLE_CONTENT_DRAWER,
} from '../actions/ui'

const INITIAL_STATE = {
    navDrawerOpenMobile: false,
    contentDrawerOpen: false,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case TOGGLE_NAVDRAWER_MOBILE:
        return {
            ...state,
            navDrawerOpenMobile: !state.navDrawerOpenMobile,
        }
    case TOGGLE_CONTENT_DRAWER:
        return {
            ...state,
            contentDrawerOpen: !state.contentDrawerOpen,
        }
    default:
        return state
    }
}
