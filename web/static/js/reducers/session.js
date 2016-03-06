import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentUser: null,
  socket: null,
  error: null
});

export default function sessionReducer(state = initialState, action) {
  return state;
}