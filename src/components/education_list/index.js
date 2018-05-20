import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import AddIcon from '@material-ui/icons/Add'
import {
    fetchEducationList,
    fetchEducationDetails,
    sortEducationTable,
    newEducation,
    editEducation,
} from '../../actions/education'
import SkillocateContentDrawer from '../skillocate_content_drawer'
import SkillocateTable from '../skillocate_table'
import FormEducation from '../form_education'
import EducationToolbar from '../education-toolbar'
// import { toggleContentDrawer } from '../../actions/ui'
import { educationView } from '../../static/views'
import { toggleContentDrawer } from '../../actions/ui'

const styles = (theme) => {
    return {
        fab: {
            position: 'absolute',
            bottom: theme.spacing.unit * 4,
            right: theme.spacing.unit * 4,
            color: '#FFF',
        },
        table: {
            width: '100%',
            display: 'block',
            overflowX: 'auto',
        },
        hero: {
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: 0,
            minHeight: '10vh',
        },
    }
}


class EducationList extends React.Component {
    componentDidMount() {
        this.props.fetchEducationList(this.props.session.authToken)
    }

    render() {
        const {
            education,
            classes,
            handleSortRequest,
        } = this.props
        if (!education.educationList) {
            return (<div>Loading...</div>)
        }

        return (
            <div>
                <EducationToolbar />
                <SkillocateTable className={classes.table}
                    columnData={educationView}
                    items={education.filteredEducationList}
                    order={education.tableView.order}
                    orderBy={education.tableView.orderBy}
                    handleSortRequest={handleSortRequest}
                    textFilter={education.controls.textFilter}
                    handleSelect={this.props.editEducation}
                    authToken={this.props.session.authToken}
                />
                <SkillocateContentDrawer
                    isOpen={this.props.ui.contentDrawerOpen}
                    handleDrawerToggle={this.props.toggleContentDrawer}>
                    <FormEducation authToken={this.props.session.authToken} handleDrawerToggle={this.props.toggleContentDrawer}/>
                </SkillocateContentDrawer>
                <Button onClick={this.props.newEducation} variant="fab" color="secondary" className={classes.fab}>
                    <AddIcon />
                </Button>
            </div>
        )
    }
}

export default connect(
    state => ({
        session: state.session,
        education: state.education,
        ui: state.ui,
    }),
    (dispatch) => {
        return {
            fetchEducationList: authToken => dispatch(fetchEducationList(authToken)),
            fetchEducationDetails: (id, authToken) => dispatch(fetchEducationDetails(id, authToken)),
            handleSortRequest: (oldValues, orderBy) => dispatch(sortEducationTable(oldValues, orderBy)),
            newEducation: () => dispatch(newEducation()),
            editEducation: (id, authToken) => dispatch(editEducation(id, authToken)),
            toggleContentDrawer: () => dispatch(toggleContentDrawer())
        }
    },
)(withStyles(styles)(EducationList))
