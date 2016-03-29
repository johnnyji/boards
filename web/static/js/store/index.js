/*
  Redux Store Configurations
 */

import {createStore, applyMiddleware} from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from 'js/reducers/index';

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

// Allows us to issue router navigations using `react-router-redux` functions, ie:
//  import {push} from 'react-router-redux';
//  this.props.dispatch(push('/some_path'));
const reduxRouterMiddleware = routerMiddleware(browserHistory);

export default function configureStore() {
  const createStoreWithMiddleware = process.env.NODE_ENV === 'production'
    ? applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware)(createStore)
    : applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore);

  return createStoreWithMiddleware(reducers);
}
