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
  errors: DEFAULT_FIELDS_STATE,
  registering: false,
  registered: false
});

export default function RegistrationReducer(state = initialState, action) {
  switch (action.type) {

    case UPDATE_FIELD: {
      const {field, value} = action.data;
      return state.setIn(['user', field], value);
    }
    case REGISTER: {
      return state.merge({
        errors: DEFAULT_FIELDS_STATE,
        registering: true
      });
    }
    case REGISTER_FAILURE: {
      return state.merge({
        errors: state.get('errors').merge(action.data.errors),
        registering: false
      });
    }
    case REGISTER_SUCCESS: {
      return state.set({
        registering: false,
        registered: true
      });
    }
    default: {
      return state;
    }

  }
}
