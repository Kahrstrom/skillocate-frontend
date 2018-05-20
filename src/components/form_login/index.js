import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import { TextField } from 'redux-form-material-ui'
import { logIn } from '../../actions/session'
import Localize from '../../static/localize'
import ButtonSubmit from '../button_submit'

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.primary.main,
        margin: '0',
    },
    card: {
        padding: theme.spacing.unit * 2,
    },
})

const { texts } = Localize.getTexts('sv', 'loginForm')

const signupText = (text) => {
    const splitText = text.split('{link}')
    return <Typography>{splitText[0]}<Link to='/register'>{splitText[1]}</Link></Typography>
}

const warn = (values) => {
    const warnings = {}
    if (values.password && values.password.length < 5) {
        warnings.password = texts.shortPasswordWarning
    }
    return warnings
}

const validate = (values) => {
    const errors = {}
    if (!values.password) {
        errors.password = texts.requiredValidation
    }
    if (!values.email) {
        errors.email = texts.requiredValidation
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = texts.emailValidation
    }
    return errors
}

class Login extends React.Component {
    render() {
        const { handleSubmit, classes } = this.props

        return (
            <Grid container spacing={24} justify="center" className={classes.root}>
                <Grid item xs={12} md={6} lg={4}>
                    <form onSubmit={handleSubmit(this.props.logIn)}>
                        <Card className={classes.card}>
                            <CardHeader title={texts.title} subheader={texts.subheader}></CardHeader>
                            <CardContent>
                                <div>
                                    <Field
                                        name="email"
                                        component={TextField}
                                        label={texts.labelEmail}
                                        ref="email"
                                        maxLength="100"
                                        fullWidth
                                        withRef
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="password"
                                        component={TextField}
                                        label={texts.labelPassword}
                                        type="password"
                                        ref="password"
                                        fullWidth
                                        withRef
                                    />
                                </div>
                            </CardContent>
                            <CardActions>
                                <ButtonSubmit
                                    variant="raised"
                                    color="primary"
                                    disabled={this.props.session.loading}
                                    text={texts.textSubmitButton}
                                    failure={!this.props.session.loading && this.props.session.error !== ''}
                                    success={!this.props.session.loading && this.props.session.valid}
                                    loading={this.props.session.loading}
                                    fullWidth
                                />
                                {signupText(texts.signupText)}
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

const FormLogin = reduxForm({
    form: 'FormLogin',
    warn,
    validate,
    destroyOnUnmount: false,
    fields: ['email', 'password'],
})(Login)


export default connect(
    (state) => { return { session: state.session, language: state.language } },
    (dispatch) => {
        return {
            logIn: (data) => {
                const validated = validate(data)
                if (Object.keys(validated).length > 0) {
                    return new SubmissionError(validated)
                }
                return dispatch(logIn(data))
            },
        }
    },
)(withStyles(styles)(FormLogin))
