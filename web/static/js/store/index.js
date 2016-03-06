/*
  Redux Store Configurations
 */

import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {syncHistory} from 'react-router-redux';
import reducers from '.././reducers/index';
import {fromJS} from 'immutable';

// Transforms state data from Immutable to JS
const transformToJs = (state) => {
  const transformedState = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) transformedState[key] = state[key].toJS();
  }
  return transformedState;
};

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
  stateTransformer: transformToJs
});

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  const createStoreWithMiddleware = process.env.NODE_ENV === 'production'
    ? applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware)(createStore)
    : applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore);

  return createStoreWithMiddleware(reducers);
}