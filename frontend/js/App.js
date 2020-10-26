import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import RepositoryDetail from './pages/RepositoryDetail';
import RepositoriesList from './pages/RepositoriesList';
import AddRepositoryForm from './pages/AddRepositoryForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/app" className="navbar-brand">Collab Tracker</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/app/repositories" className="nav-link">Repositórios</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
        <Switch>          
          <Route path="/app/repositories">
            <RepositoriesList />
          </Route>
          <Route path="/app/">
            <AddRepositoryForm/>
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
};

const Home = () => {
  return <h2>Home</h2>;
};

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default hot(App);

{
  /* <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/app'} className="nav-link"> Home </Link></li>
            <li><Link to={'/app/repositories'} className="nav-link">Repositórios</Link></li>
          </ul>
          </nav>
          <hr />
        </div>
        <Switch>
            <Route exact path="/app" component={AddRepositoryForm}/>
            <Route path="/app/repositories" component={RepositoriesList}/>
        </Switch>
      </Router> */
}
