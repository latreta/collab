// import pages
import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './bootstrap-includes';
import '../sass/style.scss';

import App from './App';

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

ReactDOM.render(
  <Router><App/></Router>
, document.getElementById('react-app'));
