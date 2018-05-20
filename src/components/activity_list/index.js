import React from 'react'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import GradeIcon from '@material-ui/icons/Grade'
import SchoolIcon from '@material-ui/icons/School'
import WorkIcon from '@material-ui/icons/Work'
import BusinessIcon from '@material-ui/icons/Business'
import AssignmentIcon from '@material-ui/icons/Assignment'

const styles = theme => ({
    icon: {
        margin: 10,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
})


// HACK. FIX THIS!
const getIcon = (descriptive) => {
    switch (descriptive) {
    case '{origin} added the project {target}':
        return <AssignmentIcon />
    case '{origin} is interested in the project {target}':
        return <FavoriteIcon />
    case '{origin} added the work experience {target}':
        return <WorkIcon />
    case '{origin} added the education {target}':
        return <SchoolIcon />
    case '{origin} added the project experience {target}':
        return <GradeIcon />
    case '{target} is now a customer!':
        return <BusinessIcon />
    default:
        return <AddAlertIcon />
    }
}

const getText = (item) => {
    const origin = item[item.origin]
    const target = item[item.target]
    return item._descriptive.replace(
        '{origin}', (origin ? origin._descriptive : ''),
    ).replace('{target}', target ? target._descriptive : '')
}

class ActivityList extends React.Component {
    render() {
        const { classes, items } = this.props
        if (!items) {
            return <div>Loading...</div>
        }
        return (
            <List dense>
                <Divider></Divider>
                {items.map(item => (
                    <div key={item._id}>
                        <ListItem button>
                            <ListItemIcon className={classes.icon}>
                                {getIcon(item._descriptive)}
                            </ListItemIcon>
                            <ListItemText primary={getText(item)} secondary={moment(item.created).fromNow()} />
                        </ListItem>
                        <Divider></Divider>
                    </div>
                ))}
            </List>
        )
    }
}

export default withStyles(styles)(ActivityList)
