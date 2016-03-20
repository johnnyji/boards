import http from '../utils/http';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE} from 'js/action_types/AuthActionTypes';
import {setCurrentUser} from 'js/actions/SessionActionCreators';

const AuthActionCreators =  {

  fetchCurrentUser() {
    return (dispatch) => {
      http.get('/api/v1/current_user')   
        .then((res) => {
          dispatch(setCurrentUser(res.user));
        })
        .catch((err) => {
          debugger; 
        });
    };
  },

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

export default AuthActionCreators;
