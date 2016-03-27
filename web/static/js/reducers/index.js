import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import registration from './Registration';
import session from './Session';

export default combineReducers({
  registration,
  routing: routerReducer,
  session
});
