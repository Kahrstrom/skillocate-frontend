import React from 'react'
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table'
import moment from 'moment'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import SkillocateTableHead from '../skillocate_table_head'


const styles = theme => ({
    root: {
        width: `calc(100% - ${theme.spacing.unit * 3}`,
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    table: {
        display: 'blocks',
        width: '100%',
        overflowX: 'auto',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
})


const getText = (item, col) => {
    const rawData = item[col.id]
    if (col.type === 'date') {
        return rawData ? moment(rawData).format('YYYY-MM-DD') : ''
    }
    return rawData
}

class SkillocateTable extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            order: 'desc',
            orderBy: 'enddate',
            page: 0,
            rowsPerPage: 10,
        }
    }

    handleChangePage(event, page) {
        this.setState({ page })
    }

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: event.target.value })
    }

    render() {
        const {
            items,
            columnData,
            handleSelect,
            classes,
            handleSortRequest,
            order,
            orderBy,
            textFilter,
        } = this.props
        const {
            page,
            rowsPerPage,
        } = this.state
        if (!items) {
            return (<div>Loading...</div>)
        }
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <SkillocateTableHead
                            order={order}
                            orderBy={orderBy}
                            columnData={columnData}
                            handleSortRequest={handleSortRequest} />
                        <TableBody>
                            {items.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((item) => {
                                const cols = columnData.map((col) => {
                                    const text = getText(item, col)
                                    return (
                                        <TableCell key={col.id} numeric={col.numeric}>{text}</TableCell>
                                    )
                                })
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={item._id}
                                        onClick={() => handleSelect(item._id)}
                                    >
                                        {cols}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(SkillocateTable)
