import {
  UPDATE_FIELD,
  REGISTER,
  REGISTER_FAILURE} from 'js/action_types/RegistrationActionTypes';
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
      dispatch(RegistrationActionCreators.registerStart());

      http.post('/api/v1/registrations', {user}) 
        .then((response) => {
          localStorage.setItem('jwt', response.jwt);
          dispatch(setCurrentUser(response.user));
        })
        .catch((err) => {
          debugger;
          dispatch(RegistrationActionCreators.registerFailure(err.response.errors));
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
  }

};

export default RegistrationActionCreators;
