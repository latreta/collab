import React from 'react';

const formTitle = 'Cadastrar Repositório';

const AddRepositoryForm = () => {
  return (
    <form>
      <div className="col-sm-12">
        <h2 className="m-5">{formTitle}</h2>
        <label>Nome do repositório</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="nomedousuario/repositório"
            className="form-control"
            id="name" />
        </div>
        <div className="input-group">
          <button type="button" className="mt-2 btn btn-primary">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRepositoryForm;
