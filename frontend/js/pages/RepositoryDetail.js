import React, { useEffect, useState } from 'react';
import {
    useParams,
  } from 'react-router-dom';
import CommitTable from '../app/collab/components/commit-table';

const RepositoryDetail = (props) => {
    const { id } = useParams();
    const [repository, setRepository] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/repositories/${id}`)
        .then(res => res.json())
        .then((data) => {
          setRepository(data);
        })
        .catch(console.log)
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