import {
  UPDATE_FIELD} from '../action_types/RegistrationActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  user: {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirmation: null
  },
  errors: {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirmation: null
  }
});

export default function RegistrationReducer(state = initialState, action) {
  switch (action.type) {

    case UPDATE_FIELD:
      const {field, value} = action.data;
      return state.setIn(['user', field], value);

    default:
      return state;

  }
}