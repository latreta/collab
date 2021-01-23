import React from 'react';

const column = [];

const CommitTable = ({ commits, count, handlePageChange }) => {
  const [loading, setLoading] = useState(false);
  
  return (
    <DataGrid
      rows={commits}
      columns={columns}
      disableColumnFilter
      pagination
      pageSize={6}
      rowCount={count}
      paginationMode="server"
      onPageChange={handlePageChange}
      loading={loading}
    />
  );
};

export default CommitTable;
