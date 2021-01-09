import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RepositoriesPage from '../pages/RepositoriesList';
import MyAccount from '../pages/myaccount';
import CommitList from '../pages/CommitList';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/app/commits">
        <CommitList />
      </Route>
      <Route path="/app/repositories">
        <RepositoriesPage />
      </Route>
      <Route path="/app/profile">
        <MyAccount />
      </Route>
      <Route path="/app">
        <RepositoriesPage />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
