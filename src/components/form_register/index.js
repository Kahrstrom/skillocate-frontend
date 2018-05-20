import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import { TextField } from 'redux-form-material-ui'
import { register } from '../../actions/session'

const required = value => (value ? 'Required' : undefined)
const email = value =>
    (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email'
        : undefined)

class Register extends Component {
    render() {
        const { handleSubmit, ...rest } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader title="Register" subheader="Register to access all the cool stuff!"></CardHeader>
                    <CardContent>
                        <div>
                            <Field
                                name="firstname"
                                component={TextField}
                                label="Firstname"
                                validate={[required]}
                                ref="firstname"
                                maxLength="50"
                                withRef
                            />
                        </div>
                        <div>
                        <Field
                            name="lastname"
                            component={TextField}
                            label="Lastname"
                            validate={[required]}
                            ref="lastname"
                            maxLength="50"
                            withRef
                        />
                        </div>
                        <div>
                        <Field
                            name="email"
                            component={TextField}
                            label="Email"
                            validate={[required, email]}
                            ref="email"
                            maxLength="100"
                            withRef
                        />
                        </div>
                        <div>
                        <Field
                            name="password"
                            component={TextField}
                            label="Password"
                            validate={[required, email]}
                            type="password"
                            ref="password"
                            maxLength="50"
                            withRef
                        />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="raised" color="primary" type="submit">
                            Register
                        </Button>
                        <div>Already a member? Sign in <Link to='/login'>here!</Link></div>
                    </CardActions>
                </Card>
            </form>
        )
    }
}

const FormRegister = reduxForm({
    form: 'FormRegister',
    fields: ['firstname', 'lastname', 'email', 'password'],
})(Register)

export default connect(
    (state) => { return { session: state.session } },
    (dispatch) => { return { handleSubmit: data => dispatch(register(data)) } },
)(FormRegister)
