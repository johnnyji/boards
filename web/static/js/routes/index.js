import React from 'react';
import {IndexRoute, Route} from 'react-router';

import AppLayout from '../components/layouts/AppLayout';
import RegistrationsNew from '../components/registrations/RegistrationsNew';

export default (
  <Route component={AppLayout}>
    <Route path="/" component={RegistrationsNew} />
  </Route>
);