import {
  SET_CURRENT_USER,
  UPDATE_FIELD} from 'js/action_types/SessionActionTypes';
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
          localStorage.setItem('jwt', response.jwt); 
          dispatch(SessionActionCreators.setCurrentUser(response.user));
        })
        .catch((err) => {
          debugger;
          dispatch(SessionActionCreators.setCurrentUser(null));
        });
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
