import React, { useEffect, useState } from 'react';
import axios from '../constants';
import {
    useParams,
  } from 'react-router-dom';
import CommitTable from '../app/collab/components/commit-table';

const RepositoryDetail = (props) => {
    const { repositoryName } = useParams();
    const [repository, setRepository] = useState([]);
    const [commits, setCommits] = useState([]);

    const fetchCommitsFromRepository = () => {
        axios.get(`http://127.0.0.1:8000/api/commits/${repositoryName}/`)
        .then(response => {
            setCommits(response.data);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchCommitsFromRepository();
    }, []) 

    return (
        <div>
            <h1>{repository.title}</h1>
            <h3>{repository.author}</h3>
            <span>{repository.description}</span>
            <CommitTable commits={commits}/>
        </div>
    )
}


export default RepositoryDetail;