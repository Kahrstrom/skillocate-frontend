import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

const drawerWidth = 420

const styles = theme => ({
    drawerPaper: {
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            position: 'relative',
            width: drawerWidth,
        },
    },
    toolbar: theme.mixins.toolbar,
    link: {
        textDecoration: 'none',
    },
    hero: {
        width: '100%',
        height: 'auto',
        display: 'block',
        margin: 0,
        minHeight: '10vh',
    },
})

class SkillocateContentDrawer extends React.Component {
    render() {
        const { classes, theme } = this.props
        return (
            <Drawer anchor="right" open={this.props.isOpen}>
                <div className={classes.drawerPaper}>
                    {this.props.hero}
                    {this.props.children}
                </div>
            </Drawer>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SkillocateContentDrawer)
