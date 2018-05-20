import React from 'react'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import Toolbar from 'material-ui/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu, { MenuItem } from 'material-ui/Menu'
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import ButtonSubmit from '../button_submit'

const styles = theme => ({
    hero: {
        width: '100%',
        height: 'auto',
        display: 'block',
        margin: 0,
        minHeight: '10vh',
        paddingBottom: theme.spacing.unit * 4,
    },
    saveButton: {
        color: 'green',
    },
    closeButton: {
        position: 'absolute',
        left: theme.spacing.unit * 2,
    },
    buttonGroup: {
        position: 'absolute',
        right: theme.spacing.unit * 2,
    },
})

class SkillocateHero extends React.Component {
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
        const {
            classes, icon = '',
            header,
            subheader = '',
            handleCloseDrawer,
        } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)
        return (
            <div>
                <div className={classes.hero}>
                    <Toolbar>
                        <IconButton className={classes.closeButton} onClick={handleCloseDrawer}>
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.buttonGroup}>
                            <ButtonSubmit customClasses={classes.saveButton}
                                disabled={!this.props.touched}
                                text="Save"
                                loading={this.props.loading}
                                failure={this.props.error !== ''}
                            />
                            {/* <Button type="submit" size="small" className={classes.saveButton}>
                                Save
                            </Button> */}
                            <IconButton
                                aria-owns={open ? 'hero-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu.bind(this)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="hero-menu"
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
                                <MenuItem>Delete</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                    <ListItem>
                        <ListItemAvatar>
                            {icon}
                        </ListItemAvatar>
                        <ListItemText primary={header} secondary={subheader} />
                    </ListItem>
                </div>
                <Divider />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.props.error !== ''}
                    onClose={this.props.handleErrorClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    action={<Button onClick={this.props.handleErrorClose} color="secondary" size="small">Ok</Button>}
                    message={<span id="message-id">{String(this.props.error)}</span>}
                />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SkillocateHero)
