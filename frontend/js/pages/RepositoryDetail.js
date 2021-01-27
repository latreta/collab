import React, { useEffect, useState } from 'react';
import axios from '../constants';
import { useParams } from 'react-router-dom';
import CommitsTable from '../app/collab/components/commits-table';

const columns = [
  { field: 'name', headerName: 'Column 1', width: 150 },
  { field: 'full_name', headerName: 'Column 2', width: 150 },
];

const ENDPOINT_REPOSITORIES = 'http://127.0.0.1:8000/api/repositories';

const RepositoryDetail = (props) => {
  const { repositoryName } = useParams();
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState({});
  const [commits, setCommits] = useState([]);
  const [count, setCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchRepositoryData = () => {
    axios
      .get(`${ENDPOINT_REPOSITORIES}/${repositoryName}`)
      .then((response) => response.data)
      .then((data) => {
        setRepository(data);
      })
      .catch((err) => console.error(err));
  };

  const ChangePage = (page) => {
    setPage(page);
  };

  const fetchRepositoryCommits = () => {
    setLoading(true);
    axios
      .get(`${ENDPOINT_REPOSITORIES}/${repositoryName}/commits/?page=${page}`)
      .then((response) => response.data)
      .then((data) => {
        setCommits(data.results);
        setCount(data.count);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRepositoryData();
    fetchRepositoryCommits();
  }, [page]);

  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <h1>
          {repository.owner}/{repository.name}
        </h1>
        <h3>{repository.owner}</h3>
      </div>
      <CommitsTable commits={commits} changePage={ChangePage} count={count} loading={loading} hideRepositoryColumn={true}/>
    </div>
  );
};

export default RepositoryDetail;
