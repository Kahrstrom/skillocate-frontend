import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { fetchActivityList, fetchActivityDetails } from '../../actions/activity'
import ActivityList from '../activity_list'

const styles = theme => ({
    card: {
    },
})

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchActivityList(this.props.session.authToken)
    }

    render() {
        const { classes, activity } = this.props
        return (
            <div>
                <Grid container spacing={24} >
                    <Grid item xs={12} md={6}>
                        <Card className={classes.card}>
                            <CardHeader title="Recent activities" />
                            <CardContent>
                                <ActivityList items={ activity.activityList } />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(
    state => ({
        session: state.session,
        activity: state.activity,
    }),
    (dispatch) => {
        return {
            fetchActivityList: authToken => dispatch(fetchActivityList(authToken)),
            fetchActivityDetails: (id, authToken) => dispatch(fetchActivityDetails(id, authToken)),
        }
    },
)(withStyles(styles)(Dashboard))
