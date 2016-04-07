import AppHeader from 'js/components/layouts/AppHeader';
import CustomPropTypes from 'js/utils/CustomPropTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';
import {addBoard} from 'js/actions/BoardActionCreators';
import {connect} from 'react-redux';

const displayName = 'HomeIndex';

@connect((state) => ({
  boards: state.board.get('boards'),
  currentUser: state.session.get('currentUser')
}))
export default class HomeIndex extends Component {

  static displayName = displayName;
  
  static propTypes = {
    boards: ImmutablePropTypes.listOf(CustomPropTypes.board).isRequired,
    currentUser: CustomPropTypes.user.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={displayName}>
        <AppHeader />
        {this._renderBoards()}
        <button
          className={`${displayName}-add-button`}
          onClick={this._handleAddBoard}>Add Board</button>
      </div>
    );
  }

  _renderBoards = () => {
    return this.props.boards.map((board) => (
      <div>Board!</div>
    ));
  };

  _handleAddBoard = () => {
    this.props.dispatch(addBoard());
  };
}
