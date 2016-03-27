/*
  Redux Store Configurations
 */

import {createStore, applyMiddleware} from 'redux';
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

export default function configureStore() {
  const createStoreWithMiddleware = process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)
    : applyMiddleware(thunkMiddleware)(createStore);

  return createStoreWithMiddleware(reducers);
}
