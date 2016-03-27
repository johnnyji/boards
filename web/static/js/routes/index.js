import React from 'react';
import {IndexRoute, Route} from 'react-router';

import AuthContainer from 'js/containers/AuthContainer';
import AppLayout from 'js/components/layouts/AppLayout';
import BoardsShow from 'js/components/boards/BoardsShow';
import HomeIndex from 'js/components/home/HomeIndex';
import RegistrationsNew from 'js/components/registrations/RegistrationsNew';
import SessionsNew from 'js/components/sessions/SessionsNew';

export default (
  <Route component={AppLayout}>
    <Route path='/sign_up' component={RegistrationsNew} />
    <Route path='/sign_in' component={SessionsNew} />

    <Route path='/' component={AuthContainer}>
      <IndexRoute component={HomeIndex} />
      <Route path='boards/:id' component={BoardsShow} />
    </Route>
  </Route>
);
