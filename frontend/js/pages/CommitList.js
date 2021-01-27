import axios from '../constants';
import React, { useEffect, useState } from 'react';
import CommitsTable from '../app/collab/components/commits-table';

const CommitList = (props) => {
    const [commits, setCommits] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(100);

    const ChangePage = (page) => {
        setPage(page);
    }

    const FetchCommits = () => {
        setLoading(true);
        (async () => {
            axios.get(`http://127.0.0.1:8000/api/commits/?page=${page}`)
            .then(response => response.data)
            .then( data => {
                setCommits(data.results);
                setCount(data.count);
                setLoading(false);
        })
        })();        
    }

    useEffect(()=>{
        FetchCommits();
    }, [page]);
  return (
    <>
      <h1>Lista de commits</h1>
      <CommitsTable commits={commits} changePage={ChangePage} count={count} loading={loading} />
    </>
  );
};

export default CommitList;
