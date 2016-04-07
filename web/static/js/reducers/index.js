import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import board from './Board';
import registration from './Registration';
import session from './Session';

export default combineReducers({
  board,
  registration,
  routing: routerReducer,
  session
});
