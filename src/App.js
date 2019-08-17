import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import '~/config/Reactotron';
import { store, persistor } from '~/store';
import Routes from './routes';

import history from '~/services/history';
import GlobalStyle from '~/styles/global';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
        <ToastContainer autoClose={3000} />
      </PersistGate>
    </Provider>
  );
}
