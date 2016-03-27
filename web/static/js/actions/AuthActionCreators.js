import http from '../utils/http';
import {
  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
} from 'js/action_types/AuthActionTypes';
import {setCurrentUser} from 'js/actions/SessionActionCreators';

const AuthActionCreators =  {

  fetchCurrentUser() {
    return (dispatch) => {
      // Start to fetch...
      dispatch(AuthActionCreators.fetchCurrentUserStart());

      http.get('/api/v1/current_user')   
        .then((response) => {
          dispatch(AuthActionCreators.fetchCurrentUserSuccess());
          dispatch(setCurrentUser(response.user));
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
          dispatch(AuthActionCreators.fetchCurrentUserFailure());
        });
    };
  },

  fetchCurrentUserFailure() {
    return {
      type: FETCH_CURRENT_USER_FAILURE
    };
  },

  fetchCurrentUserStart() {
    return {
      type: FETCH_CURRENT_USER
    };
  },

  fetchCurrentUserSuccess() {
    return {
      type: FETCH_CURRENT_USER_SUCCESS
    };
  }

};

export default AuthActionCreators;
