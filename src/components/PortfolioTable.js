import React from 'react'
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
  }
});

function PortfolioTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getDate = (date) => {
      var today = new Date(date);
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      } 
      if (mm < 10) {
        mm = '0' + mm;
      } 
      var today = dd + '/' + mm + '/' + yyyy;
      return today
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell style={{width: '80px'}}>
                            <img src={row.coin.imageUrl} alt="icon" width="36"/>
                        </TableCell>
                        <TableCell className="cursor-pointer">
                            <p className="mb-0 font-weight-bold" style={{color: '#337ab7'}}>{row.coin.name}</p>
                            <span style={{color: '#888'}}>{row.coin.symbol}</span>
                        </TableCell>
                        <TableCell>
                            {Number(row.amount).toFixed(4)}
                        </TableCell>
                        <TableCell>
                           {Number(row.buyingPriceUSD).toFixed(4)}
                        </TableCell>
                        <TableCell>
                           {Number(row.buyingPriceINR).toFixed(4)}
                        </TableCell>
                        <TableCell>
                           {getDate(row.selectedDate)}
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

export default PortfolioTable

