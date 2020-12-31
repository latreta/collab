import React, { useState } from 'react';
import axios from 'axios';

const formTitle = 'Cadastrar Repositório';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const AddRepositoryForm = () => {
  const [repoName, SetRepoName] = useState('');

  function addRepository(event) {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/api/repositories/criar/", {
      repository: repoName
    },)
    .then(response => console.log(response))
    .catch(error => console.error(error));
  }

  return (
    <form onSubmit={addRepository}>
      <div className="col-sm-12">
        <h2 className="m-5">{formTitle}</h2>
        <label>Nome do repositório</label>
        <div className="input-group">
          <input
            type="text"
            onChange={(event) => SetRepoName(event.target.value)}
            name="repository"
            placeholder="repositório"
            className="form-control"
            id="name"
          />
        </div>
        <div className="input-group">
          <button type="submit" className="mt-2 btn btn-primary">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRepositoryForm;
