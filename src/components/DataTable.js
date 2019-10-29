import React from 'react';
import currencyFormatter from 'currency-formatter'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (row) => {
      props.isOpen(row);
  }
  

  return (
    <Paper className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{fontSize: '16px', fontWeight: '600'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} style={{background: `${row.added ? '#FFFEF4' : '#fff'}`}}>
                    <TableCell style={{width: '80px'}}>
                        <img src={row.imageUrl} alt="icon" width="36"/>
                    </TableCell>
                    <TableCell>
                        {row.rank}
                    </TableCell>
                    <TableCell className="cursor-pointer" onClick={() => handleClick(row)}>
                        <p className="mb-0 font-weight-bold" style={{color: '#337ab7'}}>{row.name}</p>
                        <span style={{color: '#888'}}>{row.symbol}</span>
                    </TableCell>
                    <TableCell>
                       {currencyFormatter.format(Number(row.priceusd).toFixed(2), {code: 'USD'})}
                    </TableCell>
                    <TableCell>
                       {currencyFormatter.format(Number(row.priceinr).toFixed(2), {code: 'INR'})}
                    </TableCell>
                    <TableCell>
                        {row.supply}
                    </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}