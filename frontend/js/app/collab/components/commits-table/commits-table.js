import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom'

const createRepositoryLink = (params) => {
  return <Link to={`/app/repositories/${params.value}`}>{params.value}</Link>;
};

const CommitsTable = (props) => {
  const { commits, changePage, count, loading, hideRepositoryColumn } = props;
  const [rows, setRows] = useState([]);
  const rowsSize = 6;
  const columns = [
    { field: 'id', headerName: 'ID', hide: true, sortable: false },
    { field: 'message', headerName: 'Mensagem do commit', flex: 1, sortable: false},
    { field: 'author', headerName: 'Autor', flex: 1, sortable: false},
    { field: 'commit_date', headerName: 'Data do commit', flex: 1, sortable: false },
    { field: 'repository', headerName: 'Repositório', flex: 1, sortable: false, renderCell: createRepositoryLink, hide: hideRepositoryColumn || false }
  ];

  const handlePageChange = (params) => {
    changePage(params.page);
  };

  useEffect(() => {
    setRows(commits);
  }, [commits]);

  return (
    <div style={{ height: 450, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableSelectionOnClick
        pagination
        pageSize={rowsSize}
        rowCount={count}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default CommitsTable;
