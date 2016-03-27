import {
  UPDATE_FIELD,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS} from 'js/action_types/RegistrationActionTypes';
import {setCurrentUser} from 'js/actions/SessionActionCreators';
import http from 'js/utils/http';


/*
  Registration Action Creators
 */
const RegistrationActionCreators = {

  updateField(field, value) {
    return {
      type: UPDATE_FIELD,
      data: {field, value}
    };
  },

  register(user) {
    return (dispatch) => {
      http.post('/api/v1/registrations', {user}) 
        .then((response) => {
          localStorage.setItem('jwt', response.jwt);
          dispatch(RegistrationActionCreators.registerSuccess(response.user));
          dispatch(setCurrentUser(response.user));
        })
        .catch((response) => {
          dispatch(RegistrationActionCreators.registerFailure(response.errors));
        });
    };
  },

  registerSuccess(user) {
    return {
      type: REGISTER_SUCCESS,
      data: {user}
    };
  },

  registerFailure(errors) {
    return {
      type: REGISTER_FAILURE,
      data: {errors}
    };
  }

};

export default RegistrationActionCreators;
