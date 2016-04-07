import {
  ADD_BOARD_FAILURE,
  ADD_BOARD_SUCCESS
} from 'js/action_types/BoardActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  boards: []
}); 

export default function BoardReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_BOARD_SUCCESS: {
      return state.update('boards', (boards) => {
        return boards.push(Immutable.fromJS(action.data.board));
      });
    }
    
    case ADD_BOARD_FAILURE: {
      // TODO: Add case for ADD_BOARD_FAILURE  
      return state;
    }
    
    default: {
      return state;
    }
  }
}
