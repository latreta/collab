import axios from '../constants';
import React, { useEffect, useState } from 'react';
import TablePaginationActions from '../app/collab/components/paginator';

import CommitTable from '../app/collab/components/commit-table';

const CommitList = (props) => {
  const [commits, setCommits] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  function fetchCommits () {
    axios
      .get(`http://127.0.0.1:8000/api/commits/${pageNumber}`)
      .then((response) => response.data)
      .then((commits) => {
        setCommits(commits);
      })
      .catch((error) => {
        if (error.response.status === 404) {
        }
      });
  };

  useEffect(() => {
    fetchCommits();
  }, [pageNumber]);

  return <CommitTable tryout={this.teste.bind(this)} PaginationActions={TablePaginationActions} commits={commits} />;
};

export default CommitList;
