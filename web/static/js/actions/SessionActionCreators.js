import {
  SET_CURRENT_USER,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  UPDATE_FIELD
} from 'js/action_types/SessionActionTypes';
import http from 'js/utils/http';

const SessionActionCreators = {

  updateField(field, value) {
    return {
      type: UPDATE_FIELD,
      data: {field, value}
    };
  },

  signIn({email, password}) {
    const data = {
      session: {
        email,
        password
      }
    };

    return (dispatch) => {
      http.post('/api/v1/session', data)
        .then((response) => {
          debugger;
          localStorage.setItem('jwt', response.jwt); 
          dispatch(SessionActionCreators.setCurrentUser(response.user));
        })
        .catch((err) => {
          debugger;
          dispatch(SessionActionCreators.setCurrentUser(null));
        });
    };
  },

  signOut() {
    return (dispatch) => {
      http.delete('api/v1/current_user')
        .then((response) => {
          localStorage.removeItem('jwt');
          dispatch(SessionActionCreators.signOutSuccess());
        })
        .catch(() => {
          dispatch(SessionActionCreators.signOutFailure());
        });
    };
  },

  signOutFailure() {
    return {
      type: SIGN_OUT_FAILURE
    };
  },

  signOutSuccess() {
    return {
      type: SIGN_OUT_SUCCESS
    };
  },

  setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      data: {user}
    };
  }

};

export default SessionActionCreators;
