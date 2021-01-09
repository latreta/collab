import React from 'react';
import axios from '../constants';

const USERNAME_KEY = 'USERNAME';
const PROFILE_PIC_KEY = 'PROFILE_PIC';

const SessionService = () => {
  const getUserData = () => {
    axios
      .get('http://127.0.0.1:8000/user/')
      .then((response) => {
        window.localStorage.setItem(USERNAME_KEY, response.data.username),
          window.localStorage.setItem(PROFILE_PIC_KEY, response.data.profile_picture);
        return response.data;
      })
      .catch((error) => console.error(error));
  };
};

export default SessionService;
