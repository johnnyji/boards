import Immutable from 'immutable';
import {
  SET_CURRENT_USER,
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
  socket: null,
  error: null
});

export default function SessionReducer (state = initialState, action) {
  switch (action.type) {

    case UPDATE_FIELD:
      const {field, value} = action.data
      return state.setIn(['signInForm', 'values', field], value);

    case SET_CURRENT_USER:
      // Sets the current user after a successful sign in
      return state.set('currentUser', Immutable.fromJS(action.data.user));  

    default:
      return state;
  }
}
