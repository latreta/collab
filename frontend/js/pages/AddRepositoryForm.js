import React, { useState } from 'react';
import axios from '../constants';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const AddRepositoryForm = () => {
  const [repoName, SetRepoName] = useState('');
  const history = useHistory();
  const classes = useStyles();

  function addRepository(event) {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/repositories/criar/', {
        repository: repoName,
      })
      .then((response) => history.push(`/app/repositories/${repoName}`))
      .catch((error) => console.error(error));
  }

  return (
    <form onSubmit={addRepository}>
      <div className={classes.root}>
          <TextField
            id="repository"
            placeholder="ex: Repositório"
            name="repository"
            onChange={(event) => SetRepoName(event.target.value)}
            label="Nome do Repositório"
            variant="outlined"
            size="small"
          />
          <Button type="submit" variant="outlined" color="primary">
            Adicionar
          </Button>
        </div>
    </form>
  );
};

export default AddRepositoryForm;
