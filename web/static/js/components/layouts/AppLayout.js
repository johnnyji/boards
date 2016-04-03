import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const displayName = 'AppLayout';

@connect((state) => ({
  channel: state.session.get('channel'),
  socket: state.session.get('socket') 
})) // @connect makes `dispatch` avaliable to use a prop
export default class AppLayout extends Component {
  static displayName = displayName;

  static propTypes = {
    channel: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object
  };

  static childContextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  getChildContext() {
    return {
      dispatch: this.props.dispatch
    };
  }

  render() {
    return (
      <main className={displayName}>
        {this.props.children}
      </main>
    );
  }
}
