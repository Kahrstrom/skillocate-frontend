import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class PrivateRouteContainer extends React.Component {
    render() {
        const {
            sessionIsValid,
            component: Component,
            ...rest
        } = this.props

        return (
            <Route
                {...rest}
                render={props =>
                    (sessionIsValid
                        ? <Component {...props} />
                        : (
                            <Redirect to={{
                                pathname: '/public',
                                state: { from: props.location },
                            }} />
                        ))
                }
            />
        )
    }
}

const PrivateRoute = connect(state => ({
    sessionIsValid: state.session.valid,
}))(PrivateRouteContainer)

export default PrivateRoute
