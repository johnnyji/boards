import {
  UPDATE_FIELD,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from '../action_types/RegistrationActionTypes';
import Immutable from 'immutable';

const DEFAULT_FIELDS_STATE = Immutable.fromJS({
  firstName: null,
  lastName: null,
  email: null,
  encryptedPassword: null,
  encryptedPasswordConfirmation: null
});

const initialState = Immutable.fromJS({
  user: DEFAULT_FIELDS_STATE,
  errors: DEFAULT_FIELDS_STATE
});

export default function RegistrationReducer(state = initialState, action) {
  switch (action.type) {

    case UPDATE_FIELD:
      const {field, value} = action.data;
      return state.setIn(['user', field], value);

    case REGISTER:
      return state.merge({errors: DEFAULT_FIELDS_STATE});

    case REGISTER_FAILURE:
      return state.update('errors', (errors) => {
        return errors.merge(action.data.errors);
      });

    default:
      return state;

  }
}
