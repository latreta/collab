import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch} from 'react-router-dom';
import RepositoryDetail from './RepositoryDetail';
import RepositoryTable from '../app/collab/components/repository-table';
import axios from 'axios';

const RepositoriesList = () => {
  let match = useRouteMatch();
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/repositories/')
    .then(response => setRepositories(response.data))
    .catch(function(error) {
      console.log(error);
    });
  }, [])  

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:repositoryName`}>
          <RepositoryDetail />
        </Route>
        <Route path={match.path}>
          <h2>Repositórios cadastrados</h2>
          <RepositoryTable repositories={repositories}/>
        </Route>
      </Switch>
    </div>
  );
};


export default RepositoriesList;
