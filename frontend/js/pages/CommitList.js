import axios from '../constants';
import React, { useEffect, useState } from 'react';

import CommitTable from '../app/collab/components/commit-table';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const CommitList = () => {
  const [commits, setCommits] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const changePage = (nextPage) => {
    if(nextPage === 0) {
      nextPage = 1;
    }
    setPageNumber(nextPage);
  };

  const fetchCommits = () => {
    axios
      .get(`http://127.0.0.1:8000/api/commits/${pageNumber}`)
      .then((response) => {
        return response.data;
      })
      .then((commits) => setCommits(commits))
      .catch((error) => {
        if (error.response.status === 404){
          console.log(error.response);
          setLastPage(pageNumber-1);
          setPageNumber(pageNumber-1);
        }
      });
  };

  useEffect(() => {
    fetchCommits();
  }, [pageNumber]);

  return (
    <div>
      <CommitTable commits={commits} />
      <div style={{marginTop: "15px"}}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            disabled={pageNumber === 1}
            onClick={() => {
              changePage(pageNumber - 1);
            }}>
            Anterior
          </Button>
          <Button
            disabled={pageNumber === lastPage}
            onClick={() => {
              changePage(pageNumber + 1);
            }}>
            Próxima
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CommitList;
