import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './Auth';
import registration from './Registration';
import session from './Session';

export default combineReducers({
  auth,
  registration,
  routing: routerReducer,
  session
});
