import Immutable from 'immutable';
import {
  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_SUCCESS} from 'js/action_types/AuthActionTypes';

const initialState = Immutable.fromJS({
  fetchingCurrentUser: false,
  fetchedCurrentUser: false
});

export default function AuthReducer (state = initialState, action) {

  switch (action.type) {

    case FETCH_CURRENT_USER:
      return state.set('fetchingCurrentUser', true); 

    case FETCH_CURRENT_USER_SUCCESS:
      return state.merge({
        fetchingCurrentUser: false,
        fetchedCurrentUser: true
      });

    case FETCH_CURRENT_USER_FAILURE:
      return state.merge({
        fetchingCurrentUser: false,
        fetchedCurrentUser: false
      }); 

    default: return state;
  }
}
