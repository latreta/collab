import React, { useState } from 'react';

const formTitle = 'Cadastrar Repositório';

const AddRepositoryForm = () => {
  const [repoName, SetRepoName] = useState('');

  const csrftoken = getCookie('csrftoken');

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
    }

  function addRepository() {
    console.log(repoName);
  }

  return (
    <form
      action="http://127.0.0.1:8000/repositories/criar/" method="POST"
    >
      <div className="col-sm-12">
        <h2 className="m-5">{formTitle}</h2>
        <label>Nome do repositório</label>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
        <div className="input-group">
          <input
            type="text"
            onChange={(event) => SetRepoName(event.target.value)}
            name="repository"
            placeholder="nomedousuario/repositório"
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
