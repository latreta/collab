import React, { useState } from 'react';

const formTitle = 'Cadastrar Repositório';

const AddRepositoryForm = () => {
  const [repoName, SetRepoName] = useState("");

  function addRepository(){
    console.log(repoName);
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      addRepository();
      }}>
      <div className="col-sm-12">
        <h2 className="m-5">{formTitle}</h2>
        <label>Nome do repositório</label>
        <div className="input-group">
          <input
            type="text"
            onChange={(event) => SetRepoName(event.target.value)}
            placeholder="nomedousuario/repositório"
            className="form-control"
            id="name" />
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
