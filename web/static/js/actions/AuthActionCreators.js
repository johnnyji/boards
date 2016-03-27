import http from '../utils/http';
import {setCurrentUser} from 'js/actions/SessionActionCreators';

const AuthActionCreators =  {

  fetchCurrentUser() {
    return (dispatch) => {
      http.get('/api/v1/current_user')   
        .then((response) => {
          dispatch(setCurrentUser(response.user));
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
        });
    };
  }

};

export default AuthActionCreators;
