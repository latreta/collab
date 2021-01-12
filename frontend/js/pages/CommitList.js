import axios from '../constants';
import React, { useEffect, useState } from 'react';

import CommitTable from '../app/collab/components/commit-table';
import Paginator from '../app/collab/components/paginator/paginator';

const CommitList = () => {
  const [commits, setCommits] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const changePage = (nextPage) => {
    console.log("Changing page " + nextPage);
    setPageNumber(nextPage);
  };

  const fetchCommits = () => {
    axios
      .get(`http://127.0.0.1:8000/api/commits/${pageNumber}`)
      .then((response) => {
        return response.data;
      })
      .then((commits) => {
        setCommits(commits);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setPageNumber(pageNumber - 1);
          setLastPage(pageNumber - 1);
        }
      });
  };

  useEffect(() => {
    fetchCommits();
  }, [pageNumber]);

  return (
    <>
      <CommitTable commits={commits} />
      <Paginator pageNumber={pageNumber} lastPage={lastPage} setPage={changePage.bind(this)} />
    </>
  );
};

export default CommitList;
