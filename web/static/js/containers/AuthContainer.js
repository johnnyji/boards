import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

@connect((state) => ({
  currentUser: state.session.get('currentUser')
}))
export default class AuthContainer extends Component {

  static displayName = 'AuthContainer';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {dispatch} = this.context; 
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      dispatch(AuthActionCreators.fetchUser(jwt));
    } else {
      dispatch(push('/sign_up'));
    }
  }

  render() {
    return (
      <div>
        Hello!
      </div>
    );
  }
}
