import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import RepositoriesList from './pages/RepositoriesList';
import AddRepositoryForm from './pages/AddRepositoryForm';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

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
  const [loggedUser, setLoggedUser] = useState({})
  const history = useHistory();
  const [toLogout, setToLogout] = useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/user/",)
    .then(response => setLoggedUser(response.data))
    .catch(error => console.error(error));
  }, []);  

  if (toLogout === true) {
    location.reload();
  }

  function Logout() {
    axios
      .post('http://127.0.0.1:8000/accounts/logout/')
      .then(() => setToLogout(true))
      .catch((err) => console.error(err));
    handleClose();
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (page) => {
    history.push(page);
  }

  return (
    <div>
      {/* TODO: Extrair barra para componente separado? */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => history.push('/app')}>
            Repo Tracker
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <span style={{fontSize: "16px", marginRight: "15px"}}>Olá, {loggedUser.username}</span>
                <img style={{borderRadius: "50px", height: "30px", width: "30px"}} src={loggedUser.profile_picture}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigateTo('/app/repositories')}>Repositórios</MenuItem>
                <MenuItem onClick={() => navigateTo('/app/profile')}>Minha Conta</MenuItem>
                <MenuItem onClick={Logout}>Sair</MenuItem>
              </Menu>
            </div>
          )}
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
  );
};

export default hot(App);
