import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import session from './Session';

export default combineReducers({
  routing: routerReducer,
  session
});