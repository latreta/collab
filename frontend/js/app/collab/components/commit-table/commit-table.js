import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import axios from '../../../../constants';

const CommitTable = (props) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState([]);
  const { repository } = props;
  const columns = [
    {
      field: 'message',
      headerName: 'Mensagem do commit',
      minWidth: 150,
      width: 250,
      sortable: false,
    },
    { field: 'author', headerName: 'Autor', minWidth: 150, width: 250, sortable: false },
    {
      field: 'commit_date',
      headerName: 'Data do commit',
      minWidth: 150,
      width: 250,
      sortable: false,
    },
    {
      field: 'repository',
      headerName: 'Repositório',
      minWidth: 150,
      width: 250,
      sortable: false,
      renderCell: (params) => {
        return <Link to={`/app/repositories/${params.value}`}>{params.value}</Link>;
      },
    },
  ];

  console.log(repository);

  const fetchCommits = (repositoryName) => {
    setLoading(true);
    if(repositoryName){
      // TODO: Implementar o viewset no django para filtrar pelo nome
      // axios
      // .get(`http://127.0.0.1:8000/teste/commits/?format=json&page=${page}`)
      // .then((response) => response.data)
      // .then((data) => {
      //   setCount(data.count);
      //   setRows(data.results);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
    else {
      axios
      .get(`http://127.0.0.1:8000/teste/commits/?format=json&page=${page}`)
      .then((response) => response.data)
      .then((data) => {
        setCount(data.count);
        setRows(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommits();
  }, [page]);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  return (
    <div style={{ height: 425, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        pagination
        pageSize={6}
        rowCount={count}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default CommitTable;
