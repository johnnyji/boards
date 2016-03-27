import {
  UPDATE_FIELD,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from '../action_types/RegistrationActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  user: {
    firstName: null,
    lastName: null,
    email: null,
    encryptedPassword: null,
    encryptedPasswordConfirmation: null
  },
  errors: {
    firstName: null,
    lastName: null,
    email: null,
    encryptedPassword: null,
    encryptedPasswordConfirmation: null
  }
});

export default function RegistrationReducer(state = initialState, action) {
  switch (action.type) {

    case UPDATE_FIELD:
      const {field, value} = action.data;
      return state.setIn(['user', field], value);

    case REGISTER_FAILURE:
      return state.update('errors', (errors) => {
        return errors.merge(action.data.errors);
      });

    default:
      return state;

  }
}
