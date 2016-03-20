import {
  SET_CURRENT_USER,
  UPDATE_FIELD} from 'js/action_types/SessionActionTypes';

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
        .then((res) => {
          localStorage.setItem('jwt', res.jwt); 
          dispatch(this.setCurrentUser(res.user));
        })
        .catch((err) => {
          debugger;
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
