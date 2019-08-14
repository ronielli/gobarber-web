import React from 'react';
import { Switch } from 'react-router-dom';
import SingnIn from '../pages/Signin';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingnIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/singnIn" component={Profile} isPrivate />
    </Switch>
  );
}
