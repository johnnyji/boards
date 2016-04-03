import Immutable from 'immutable';
import {
  CONNECT_SOCKET_FAILURE,
  CONNECT_SOCKET_SUCCESS,
  SET_CURRENT_USER,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  UPDATE_FIELD} from 'js/action_types/SessionActionTypes';

const initialState = Immutable.fromJS({
  currentUser: null,
  signInForm: {
    values: {
      email: null,
      password: null
    },
    errors: {
      email: null,
      password: null
    }
  },
  channel: null,
  socket: null,
  error: null
});

export default function SessionReducer (state = initialState, action) {
  switch (action.type) {
    case CONNECT_SOCKET_FAILURE: {
      return state.merge({
        channel: null, 
        socket: null
      });
    }
    case CONNECT_SOCKET_SUCCESS: {
      return state.merge({
        channel: action.data.channel,
        socket: action.data.socket
      });
    }
    case SET_CURRENT_USER: {
      // Sets the current user after a successful sign in
      return state.set('currentUser', Immutable.fromJS(action.data.user));  
    }
    case SIGN_OUT_SUCCESS: {
      return state.set('currentUser', null);
    }
    case SIGN_OUT_FAILURE: {
      // TODO: What are we actually doing with this message?
      return state.set('error', 'Unable to logout');
    }
    case UPDATE_FIELD: {
      const {field, value} = action.data;
      return state.setIn(['signInForm', 'values', field], value);
    }
    default: {
      return state;
    }
  }
}
