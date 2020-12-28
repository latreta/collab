import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    useParams,
  } from 'react-router-dom';
import CommitTable from '../app/collab/components/commit-table';

const RepositoryDetail = (props) => {
    const { id } = useParams();
    const [repository, setRepository] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/repositories/${id}/`)
        .then(response => setRepository(response.data))
        .catch(error => console.log(error));
    }, []) 

    return (
        <div>
            <h1>{repository.title}</h1>
            <h3>{repository.author}</h3>
            <span>{repository.description}</span>
            <CommitTable/>
        </div>
    )
}


export default RepositoryDetail;