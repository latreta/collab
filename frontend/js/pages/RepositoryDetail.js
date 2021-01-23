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
  const [repository, setRepository] = useState({});
  const [commits, setCommits] = useState([]);

  const fetchRepositoryData = () => {
    axios.get(`${ENDPOINT_REPOSITORIES}/${repositoryName}`)
    .then((response) => response.data)
    .then((data) => {
      setRepository(data);
    })
    .catch((err) => console.error(err));
  }

  const fetchRepositoryCommits = () => {
    axios.get(`${ENDPOINT_REPOSITORIES}/${repositoryName}/commits`)
    .then((response) => response.data)
    .then((data) => {
      setCommits(data.results);
    })
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchRepositoryData();
    fetchRepositoryCommits();
  }, []);

  return (
    <div>
      <h1>{repository.owner}/{repository.name}</h1>
      <h3>{repository.owner}</h3>
      {JSON.stringify(commits)}
    </div>
  );
};

export default RepositoryDetail;
