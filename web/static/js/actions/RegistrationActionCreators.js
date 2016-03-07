import {
  UPDATE_FIELD} from '../action_types/RegistrationActionTypes';


/*
  Registration Action Creators
 */
export default {

  updateField(field, value) {
    return {
      type: UPDATE_FIELD,
      data: {field, value}
    };
  }

};