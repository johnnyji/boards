import React, {Component, PropTypes} from 'react';

const displayName = 'AppLayout';

export default class AppLayout extends Component {
  static displayName = displayName;

  render() {
    return (
      <main className={displayName}>
        <header className={`${displayName}-header`}>Boards!</header>
      </main>
    );
  }
}
