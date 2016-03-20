import React, {Children, Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {fetchCurrentUser} from 'js/actions/AuthActionCreators';

@connect((state) => ({
  currentUser: state.session.get('currentUser')
}))
export default class AuthContainer extends Component {

  static displayName = 'AuthContainer';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {dispatch} = this.context; 
    
    // TODO: Currently in order to fetch the current user, the client
    // is sending the JWT as a parameter to the API, however the API expects a
    // `name` and `email` field as seen in Boards.SessionHelper.authenticate/2
    //
    // How would I send the `name` and the `email` fields on load if I'm
    // can't retrieve them?
    if (localStorage.getItem('jwt')) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(push('/sign_up'));
    }
  }

  componentWillReceiveProps() {
    if (this.props.currentUser && !nextProps.currentUser) {
      replace('/sign_up');
    }
  }

  render() {
    if (!this.props.currentUser) return <div>'Loading...'</div>;
    
    return Children.only(this.props.children);
  }
}
