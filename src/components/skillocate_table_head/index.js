import React from 'react'
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table'
import Tooltip from 'material-ui/Tooltip'

class SkillocateTableHead extends React.Component {
    render() {
        const {
            order,
            orderBy,
            columnData,
            handleSortRequest,
        } = this.props
        return (
            <TableHead>
                <TableRow>
                    {columnData.map((column) => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={() => handleSortRequest({ order, orderBy }, column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        )
                    }, this)}
                </TableRow>
            </TableHead>
        )
    }
}

export default SkillocateTableHead
