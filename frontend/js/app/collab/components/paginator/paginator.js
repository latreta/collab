import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Paginator = ({setPage, pageNumber, lastPage}) => {

  useEffect(() => {
  }, [pageNumber]);

  const changePage = (nextPage) => {
    console.log("TEste", nextPage)
    if (nextPage === 0) {
      nextPage = 1;
    }
    setPage(nextPage);
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          disabled={pageNumber === 1}
          onClick={() => {
            changePage(pageNumber - 1);
          }}
        >
          Anterior
        </Button>
        <Button
          disabled={pageNumber === lastPage}
          onClick={() => {
            changePage(pageNumber + 1);
          }}
        >
          Próxima
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Paginator;
