import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './services/history';
import './config/Reactotron';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
