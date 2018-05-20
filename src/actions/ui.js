export const TOGGLE_NAVDRAWER_MOBILE = 'TOGGLE_NAVDRAWER'
export const TOGGLE_CONTENT_DRAWER = 'TOGGLE_CONTENT_DRAWER'

export const toggleNavDrawerMobile = () => {
    return {
        type: TOGGLE_NAVDRAWER_MOBILE,
    }
}

export const toggleContentDrawer = () => {
    return {
        type: TOGGLE_CONTENT_DRAWER,
    }
}
