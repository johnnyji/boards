import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from '../routes/index';

export default class Root extends Component {

  static displayName = 'Root';

  static propTypes = {
    routerHistory: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.routerHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
