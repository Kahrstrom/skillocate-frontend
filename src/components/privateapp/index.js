import React from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import SkillocateAppBar from '../skillocate_appbar'
import SkillocateNavDrawer from '../skillocate_navdrawer'
import PrivateRoute from '../privateroute'
import Dashboard from '../dashboard'
import ProjectExperienceList from '../project_experience_list'
import CustomerList from '../customer_list'
import EducationList from '../education_list'
import WorkExperiencetList from '../work_experience_list'
import ProjectList from '../project_list'
import { toggleNavDrawerMobile } from '../../actions/ui'

const styles = (theme) => {
    return {

        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit * 3,
        },
        root: {
            flexGrow: 1,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            width: '100%',
        },
        toolbar: theme.mixins.toolbar,
    }
}

class PrivateApp extends React.Component {
    render() {
        const { classes } = this.props
        console.log(this.props)
        return (
            <div className={classes.root}>
                <SkillocateAppBar handleToggle={this.props.toggleNavDrawerMobile}/>
                <SkillocateNavDrawer openMobile={this.props.ui.navDrawerOpenMobile} handleDrawerToggle={this.props.toggleNavDrawerMobile} />
                <main className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <PrivateRoute path="/project" component={ProjectList} />
                        <PrivateRoute path="/workexperience" component={WorkExperiencetList} />
                        <PrivateRoute path="/education" component={EducationList} />
                        <PrivateRoute path="/projectexperience" component={ProjectExperienceList} />
                        <PrivateRoute path="/customer" component={CustomerList} />
                        <PrivateRoute path="/" component={Dashboard} />
                    </Switch>
                </main>
            </div>
        )
    }
}
export default connect(
    state => ({ ui: state.ui, router: state.routerReducer }),
    dispatch => ({ toggleNavDrawerMobile: () => dispatch(toggleNavDrawerMobile()) }),
)(withStyles(styles)(PrivateApp))
