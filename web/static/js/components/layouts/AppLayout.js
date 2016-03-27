import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import AppHeader from './AppHeader';

const displayName = 'AppLayout';

@connect(() => ({})) // @connect makes `dispatch` avaliable to use a prop
export default class AppLayout extends Component {
  static displayName = displayName;

  static propTypes = {
    dispatch: PropTypes.func.isRequired
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
        <AppHeader />
        {this.props.children}
      </main>
    );
  }
}
