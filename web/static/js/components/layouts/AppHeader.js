import React, {Component, PropTypes} from 'react';
import {signOut} from 'js/actions/SessionActionCreators';

const displayName = 'AppHeader';

export default class AppHeader extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <header className={displayName}>
        <p>Boards!</p>
        <button onClick={this._handleLogout}>Logout</button> 
      </header>
    );
  }

  _handleLogout = () => {
    this.context.dispatch(signOut());
  };

}

