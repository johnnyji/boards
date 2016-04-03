import http from '../utils/http';
import {connectSocket, setCurrentUser} from 'js/actions/SessionActionCreators';

const AuthActionCreators =  {

  fetchCurrentUser() {
    return (dispatch) => {
      http.get('/api/v1/current_user')   
        .then((response) => {
          dispatch(connectSocket(response.user));
          dispatch(setCurrentUser(response.user));
        })
        .catch(() => localStorage.removeItem('jwt'));
    };
  }

};

export default AuthActionCreators;
