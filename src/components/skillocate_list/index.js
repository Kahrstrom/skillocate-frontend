import React from 'react'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
    avatar: {
        margin: 10,
        backgroundColor: theme.palette.secondary.dark,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
})

const getInitials = (name) => {
    const names = name.split(' ')
    if (name.length === 1) {
        return name
    }
    if (names.length === 1) {
        return name.substring(0, 2)
    }
    return `${names[0].substring(0, 1)}${names[1].substring(0, 1)}`
}

class SkillocateList extends React.Component {
    render() {
        const { items, handleSelect, classes } = this.props
        if (!items) {
            return (<div>Loading...</div>)
        }
        return (
            <List>{items.map(item => (
                <div key={item._id}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                {getInitials(item.user._descriptive)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            {item._descriptive}
                        </ListItemText>
                    </ListItem>
                    <Divider></Divider>
                </div>
            ))}
            </List>

        )
    }
}

export default withStyles(styles)(SkillocateList)
