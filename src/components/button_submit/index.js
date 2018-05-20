import React from 'react'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import classNames from 'classnames'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import CheckIcon from '@material-ui/icons/Check'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

const styles = theme => ({
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonFailure: {
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[900],
        },
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
})

class ButtonSubmit extends React.Component {
    constructor(props) {
        super()
        this.state = {
            showSubmitResponse: props.success || props.failure,
        }
    }

    render() {
        const {
            disabled,
            success = false,
            failure = false,
            classes,
            text,
            loading,
            customClasses,
            ...rest
        } = this.props
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success && this.state.showSubmitResponse,
            [classes.buttonFailure]: failure && this.state.showSubmitResponse,
            [customClasses]: !!customClasses,
        })

        if (this.state.showSubmitResponse) {
            setTimeout(() => {
                this.setState({ showSubmitResponse: false })
            }, 2000)
        }
        return (
            <span className={classes.wrapper}>
                <Button
                    {...rest}
                    disabled={disabled}
                    className={buttonClassname}
                    type="submit"

                >
                    { !this.state.showSubmitResponse ? text : '' }
                    { this.state.showSubmitResponse && success ? <CheckIcon /> : ''}
                    { this.state.showSubmitResponse && failure ? <NotInterestedIcon /> : ''}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </span>
        )
    }
}

export default withStyles(styles)(ButtonSubmit)
