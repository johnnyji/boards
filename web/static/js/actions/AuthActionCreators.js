import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE} from '../action_types/AuthActionTypes';

/*
  Auth Action Creators
 */
export default {

  register(user) {
    debugger;
    return (dispatch) => {
      fetch('/api/v1/registrations', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
        .then((res) => res.json())
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
  },

};