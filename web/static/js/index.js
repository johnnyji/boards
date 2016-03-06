import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import configureStore from './store/index';
import Root from './containers/Root';

const store  = configureStore(browserHistory);

ReactDOM.render(
  <Root routerHistory={browserHistory} store={store}/>,
  document.getElementById('app-mount')
);