import {
  CONNECT_SOCKET_FAILURE,
  CONNECT_SOCKET_SUCCESS,
  SET_CURRENT_USER,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  UPDATE_FIELD
} from 'js/action_types/SessionActionTypes';
import http from 'js/utils/http';
import {Socket} from 'js/phoenix';

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
          dispatch(SessionActionCreators.connectSocket(response.user));
          dispatch(SessionActionCreators.setCurrentUser(response.user));
        })
        .catch((err) => {
          dispatch(SessionActionCreators.setCurrentUser(null));
        });
    };
  },

  signOut() {
    return (dispatch) => {
      http.delete('api/v1/session')
        .then(() => {
          localStorage.removeItem('jwt');
          dispatch(SessionActionCreators.signOutSuccess());
        })
        .catch((err) => {
          debugger;
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
  },

  connectSocket(user) {
    return (dispatch) => {
      // Creates a new socket and passes in our created `conn` object with `jwt` as
      // a param to authorize the user in `Boards.UserSocket.connect`
      const socket = new Socket('/socket', {params: {jwt: localStorage.getItem('jwt')}});
      // Initializes the socket connection
      socket.connect();
      // Joins our current user's channel
      const channel = socket.channel(`users:${user.id}`);
      channel
        .join()
        .receive('ok', () => {
          dispatch(SessionActionCreators.connectSocketSuccess({socket, channel}));
        })
        .receive('error', () => {
          dispatch(SessionActionCreators.connectSocketFailure());
        });
    };
  },

  connectSocketFailure() {
    return {
      type: CONNECT_SOCKET_FAILURE
    };
  },

  connectSocketSuccess({socket, channel}) {
    return {
      type: CONNECT_SOCKET_SUCCESS,
      data: {socket, channel}
    };
  }

};

export default SessionActionCreators;
