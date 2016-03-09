import http from '../utils/http';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE} from '../action_types/AuthActionTypes';

/*
  Auth Action Creators
 */
export default {

  register(user) {
    return (dispatch) => {
      http.post('/api/v1/registrations', {user}) 
        .then((res) => {
          debugger;
          localStorage.setItem('jwt', res.jwt);
          dispatch(this.registerSuccess(res.user));
        })
        .catch((err) => {
          debugger;
          dispatch(this.registerFailure(res.error));
        });
    };
  },

  registerSuccess(user) {
    return {
      type: REGISTER_SUCCESS,
      data: {user}
    };
  },

  registerFailure(err) {
    return {
      type: REGISTER_FAILURE,
      data: {err}
    };
  }

};