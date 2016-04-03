import {
  UPDATE_FIELD,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from 'js/action_types/RegistrationActionTypes';
import {connectSocket, setCurrentUser} from 'js/actions/SessionActionCreators';
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
      dispatch(RegistrationActionCreators.registerStart());

      http.post('/api/v1/registrations', {user}) 
        .then((response) => {
          localStorage.setItem('jwt', response.jwt);
          dispatch(RegistrationActionCreators.registerSuccess());
          dispatch(setCurrentUser(response.user));
          dispatch(connectSocket(response.user));
        })
        .catch((response) => {
          dispatch(RegistrationActionCreators.registerFailure(response.errors));
        });
    };
  },
  
  registerFailure(errors) {
    return {
      type: REGISTER_FAILURE,
      data: {errors}
    };
  },

  registerStart() {
    return {
      type: REGISTER
    };
  },

  registerSuccess() {
    return {
      type: REGISTER_SUCCESS
    };
  }

};

export default RegistrationActionCreators;
