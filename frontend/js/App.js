import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom';
import RepositoriesList from './pages/RepositoriesList';
import AddRepositoryForm from './pages/AddRepositoryForm';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = (props) => {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Collab Tracker
            </Typography>
            <Link to="/app/repositories" component={Button} color="inherit">
              Repositórios
            </Link>
          </Toolbar>
        </AppBar>
        <div className="p-4 container">
        <Switch>
          <Route path="/app/repositories">
            <RepositoriesList />
          </Route>
          <Route path="/app/">
            <AddRepositoryForm />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
};

export default hot(App);
