import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from 'material-ui/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu, { MenuItem } from 'material-ui/Menu'
import { logOut } from '../../actions/session'

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    flex: {
        flex: 1,
    },
})

class SkillocateAppBar extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorElement: null,
        }
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ anchorEl: null })
    }

    render() {
        const { classes, handleToggle, handleLogout } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleToggle}
                        className={classes.navIconHide}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Skillocate
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu.bind(this)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose.bind(this)}
                        >
                            <MenuItem onClick={this.handleClose.bind(this)}>My profile</MenuItem>
                            <MenuItem onClick={() => handleLogout(this.props.session.auth_token)}>Sign out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default connect(
    (state) => { return { session: state.session } },
    (dispatch) => { return { handleLogout: token => dispatch(logOut(token)) } },
)(withStyles(styles)(SkillocateAppBar))
