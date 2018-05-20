import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'


const SkillocateNavLink = (text, icon) => (
    <ListItem button>
        <ListItemIcon>
            icon
        </ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
)

export default SkillocateNavLink
