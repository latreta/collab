import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CommitTableStyle = makeStyles({
  table: {
    minWidth: 500,
  },
});

const CommitTable = (props) => {
  const classes = CommitTableStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const {teste, commits, PaginationActions } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    teste();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {commits.map((commit, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {commit.fields.message}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {commit.fields.author}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {commit.fields.repository_id.repository_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6, 12, 18]}
              colSpan={3}
              rowsPerPage={rowsPerPage}
              count={13}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CommitTable;
