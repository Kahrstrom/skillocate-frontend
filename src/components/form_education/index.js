import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { TextField, Select } from 'redux-form-material-ui'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import SchoolIcon from '@material-ui/icons/School'
import { MenuItem } from 'material-ui/Menu'
import Input, { InputLabel } from 'material-ui/Input'
import SkillocateAutocomplete from '../skillocate_autocomplete'
import { saveEducation, errorSeen } from '../../actions/education'
import SkillocateHero from '../skillocate_hero'

const styles = theme => ({
    formContainer: {
        padding: theme.spacing.unit * 2,
    },
    fullWidth: {
        width: '100%',
    },
    select: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 2,
    },
    avatar: {
        backgroundColor: theme.palette.education.main,
    },
})

const validate = (values) => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    }
    if (values.title.length > 50) {
        errors.title = 'Maximum 50 characters'
    }
    return errors
}

const preventEnterSubmit = (event) => {
    if (event.target.type !== 'textarea' && event.which === 13 /* Enter */) {
        event.preventDefault()
    }
}

class Education extends React.Component {
    constructor() {
        super()
        this.escFunction = this.escFunction.bind(this)
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.handleDrawerToggle()
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
        const {
            handleSubmit,
            classes,
            initialValues,
            education: { types = [] },
        } = this.props
        const hero = (
            <SkillocateHero
                header={initialValues.title ? initialValues.title : 'Education'}
                subheader={initialValues.title ? 'Education' : ''}
                handleCloseDrawer={this.props.handleDrawerToggle}
                touched={this.props.anyTouched}
                error={this.props.education.error}
                loading={this.props.education.loading}
                handleErrorClose={this.props.errorSeen}
                icon={<Avatar className={classes.avatar}><SchoolIcon /></Avatar>}
            />
        )
        return (
            <form
                onKeyPress={preventEnterSubmit.bind(this)}
                onSubmit={handleSubmit(values => this.props.save(values, this.props.authToken))}>
                {hero}
                <div className={classes.formContainer}>
                    <div className={classes.fieldContainer}>
                        <Field
                            name="title"
                            component={TextField}
                            label="Title"
                            ref="title"
                            maxLength="50"
                            fullWidth
                            withRef
                            margin="normal"
                        />
                    </div>
                    <div className={classes.fieldContainer}>
                        <Field
                            name="school"
                            component={TextField}
                            label="School"
                            ref="school"
                            fullWidth
                            withRef
                            margin="normal"
                        />
                    </div>
                    <div className={classes.fieldContainer}>
                        <Field
                            name="extent"
                            component={TextField}
                            label="Extent"
                            ref="extent"
                            fullWidth
                            withRef
                            margin="normal"
                        />
                    </div>
                    <div className={classes.fieldContainer}>
                        <Field
                            name="description"
                            component={TextField}
                            label="Description"
                            ref="description"
                            multiline
                            rowsMax="4"
                            fullWidth
                            withRef
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Field
                            name="startdate"
                            component={TextField}
                            ref="startdate"
                            label="Start date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            withRef
                            type="date"
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Field
                            name="enddate"
                            component={TextField}
                            ref="enddate"
                            label="End date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            withRef
                            type="date"
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Field
                            className={classes.fullWidth}
                            name="tags"
                            component={SkillocateAutocomplete}
                            label="Tags"
                            placeholder="Add some tags"
                            fullWidth={true}
                        />
                    </div>
                    <div>
                        <Field
                            fullWidth
                            name="type"
                            component={TextField}
                            select
                            label="Type"
                            margin="normal"
                            placeholder="Select type">
                            {types.map((type) => {
                                return <MenuItem key={type} value={type}>{type}</MenuItem>
                            })}
                        </Field>
                    </div>
                </div>
            </form>
        )
    }
}

const FormEducation = reduxForm({
    form: 'FormEducation',
    validate,
    fields: ['title', 'school', 'extent', 'startdate', 'enddate', 'type', 'tags', 'highlight', '_id', 'description'],
})(Education)


export default connect(
    (state) => { return { session: state.session, initialValues: state.education.educationDetails, education: state.education } },
    (dispatch) => {
        return {
            save: (education, authToken) => dispatch(saveEducation(education, authToken)),
            errorSeen: () => dispatch(errorSeen()),
        }
    },
)(withStyles(styles)(FormEducation))
