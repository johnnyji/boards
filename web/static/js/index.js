import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from 'js/store/index';
import Root from 'js/containers/Root';

injectTapEventPlugin();

const store  = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root routerHistory={history} store={store} />,
  document.getElementById('app-mount')
);
