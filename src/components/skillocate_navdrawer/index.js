import React from 'react'
import { Link } from 'react-router-dom'
import Hidden from 'material-ui/Hidden'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import GradeIcon from '@material-ui/icons/Grade'
import HomeIcon from '@material-ui/icons/Home'
import SchoolIcon from '@material-ui/icons/School'
import WorkIcon from '@material-ui/icons/Work'
import BusinessIcon from '@material-ui/icons/Business'
import AssignmentIcon from '@material-ui/icons/Assignment'

const drawerWidth = 320

const styles = theme => ({
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    toolbar: theme.mixins.toolbar,
    link: {
        textDecoration: 'none',
    },
})

class SkillocateNavDrawer extends React.Component {
    render() {
        const { classes, theme } = this.props
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <Link className={classes.link} to="/" onClick={this.props.handleDrawerToggle}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link className={classes.link} to="/customer" onClick={this.props.handleDrawerToggle}>
                        <ListItem button>
                            <ListItemIcon>
                                <BusinessIcon />
                            </ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                    </Link>
                    <Link className={classes.link} to="/project" onClick={this.props.handleDrawerToggle}>
                        <ListItem button>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Projects" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link className={classes.link} to="/projectexperience" onClick={this.props.handleDrawerToggle}>
                        <ListItem button>
                            <ListItemIcon>
                                <GradeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Project experience" />
                        </ListItem>
                    </Link>
                    <Link className={classes.link} to="/education" onClick={this.props.handleDrawerToggle}>
                        <ListItem button>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="Educations" />
                        </ListItem>
                    </Link>
                    <Link className={classes.link} to="/workexperience" onClick={this.props.handleDrawerToggle}>
                        <ListItem button>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Work experience" />
                        </ListItem>
                    </Link>
                </List>
            </div>
        )
        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.openMobile}
                        onClose={this.props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SkillocateNavDrawer)
