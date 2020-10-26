import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch} from 'react-router-dom';
import RepositoryDetail from './RepositoryDetail';
import RepositoryTable from '../app/collab/components/repository-table';
import API_URL from '../constants';

const RepositoriesList = () => {
  let match = useRouteMatch();
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    fetch(`${API_URL}/repositories`)
        .then(res => res.json())
        .then((data) => {
          setRepositories(data);
        })
        .catch(console.log)
  }, [])  

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:id`}>
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
