import {
  ADD_BOARD_FAILURE,
  ADD_BOARD_SUCCESS
} from 'js/action_types/BoardActionTypes';
import http from 'js/utils/http';
import config from 'js/utils/config';

const BoardActionCreators = {

  addBoard() {
    return (dispatch) => {
      http.post(`${config.apiPrefix}/boards`, {}) 
        .then((response) => {
          debugger;
          dispatch(BoardActionCreators.addBoardSuccess());
        })
        .catch((response) => {
          debugger;
          dispatch(BoardActionCreators.addBoardFailure());
        });
    };
  },

  addBoardFailure() {
    return {
      type: ADD_BOARD_FAILURE
    };
  },

  addBoardSuccess(board) {
    return {
      type: ADD_BOARD_SUCCESS,
      data: {board}
    };
  }

};

export default BoardActionCreators;
