import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from '../constants';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto"
  },
});

const MyAccount = () => {
  const [user, setUser] = useState({});
  const classes = useStyles();

  const endpointURL = 'http://127.0.0.1:8000/user/';

  useEffect(() => {
    axios
      .get(endpointURL)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Card align="center" className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={user.profile_picture}
          title="User Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Olá, {user.username}
          </Typography>
          <Typography variant="body3" color="textSecondary" component="p">
            {user.bio}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="medium" color="primary" onClick={() => window.open(`https://github.com/${user.username}`)}>
          Ver perfil
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default MyAccount;
