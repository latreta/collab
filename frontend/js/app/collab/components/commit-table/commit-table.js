import React, { useEffect, useState } from 'react';
import { DataGrid, ColDef  }  from '@material-ui/data-grid';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

const CommitTable = (props) => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const { commits } = props;
  const columns = [
    { field: 'message', headerName: 'Column 1', width: 150 },
    { field: 'author', headerName: 'Column 2', width: 150 },
    { field: 'commit_date', headerName: 'Column 2', width: 150 },
  ];

  useEffect(() => {},[]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={commits}
        // columns={columns}
        pagination
        pageSize={5}
        rowCount={100}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="custom pagination table">
    //     <TableBody>
    //       {commits.map((commit, index) => (
    //         <TableRow key={index}>
    //           <TableCell component="th" scope="row">
    //             {commit.fields.message}
    //           </TableCell>
    //           <TableCell style={{ width: 160 }} align="right">
    //             {commit.fields.author}
    //           </TableCell>
    //           <TableCell style={{ width: 160 }} align="right">
    //             {commit.fields.repository_id.repository_name}
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //     <TableFooter>
    //       <TableRow>
    //         <TablePagination
    //           rowsPerPageOptions={[6, 12, 18]}
    //           colSpan={3}
    //           rowsPerPage={rowsPerPage}
    //           count={13}
    //           page={page}
    //           SelectProps={{
    //             inputProps: { 'aria-label': 'rows per page' },
    //             native: true,
    //           }}
    //           onChangePage={handleChangePage}
    //           onChangeRowsPerPage={handleChangeRowsPerPage}
    //           ActionsComponent={PaginationActions}
    //         />
    //       </TableRow>
    //     </TableFooter>
    //   </Table>
    // </TableContainer>
  );
}

export default CommitTable;
