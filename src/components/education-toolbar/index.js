import React from 'react'
import {
    FormGroup,
    FormControlLabel,
} from 'material-ui/Form'
import {
    Fields,
    TextField,
    Switch,
} from 'redux-form-material-ui'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import FilterListIcon from '@material-ui/icons/FilterList'
import { withStyles } from 'material-ui/styles'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { filterEducationList } from '../../actions/education'

const styles = (theme) => {
    return {
        toolbar: {
            ...theme.mixins.toolbar,
            marginTop: '-24px',
            marginLeft: '-24px',
            marginRight: '-24px',
            marginBottom: '24px',
            padding: '12px',
        },
        searchField: {
            margin: theme.spacing.unit,
            align: 'center',
        },
    }
}

class FormEducationToolbar extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.toolbar} >
                <form >
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Field name="filterOnlyMe" component={Switch} />
                            }
                            label="Show only mine"
                        />
                        <div className={classes.searchField}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <FilterListIcon />
                                </Grid>
                                <Grid item>
                                    <Field placeholder="Filter" name="textFilter" component={TextField} debounce={300} type="search" />
                                </Grid>
                            </Grid>
                        </div>
                    </FormGroup>
                </form>
            </Paper>
        )
    }
}

const EducationToolbar = reduxForm({
    form: 'formEducationToolbar',
    destroyOnUnmount: false,
    fields: ['filterOnlyMe'],
    onChange: (values, dispatch, props, previousValues) => {
        const isTextFilter = values.textFilter !== previousValues.textFilter
        const debounceTime = isTextFilter ? 400 : 0
        _.debounce(props.handleSubmit, debounceTime)(props.values)
    },
})(FormEducationToolbar)

export default connect(
    state => ({ initialValues: state.education.controls }),
    (dispatch) => { return { handleSubmit: controls => (dispatch(filterEducationList(controls))) } },
)(withStyles(styles)(EducationToolbar))
