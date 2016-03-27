import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import CustomPropTypes from 'js/utils/CustomPropTypes';
import {fetchCurrentUser} from 'js/actions/AuthActionCreators';

@connect((state) => ({
  currentUser: state.session.get('currentUser'),
  fetchingCurrentUser: state.auth.get('fetchingCurrentUser'),
  fetchedCurrentUser: state.auth.get('fetchedCurrentUser')
}))
export default class AuthContainer extends Component {

  static displayName = 'AuthContainer';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static propTypes = {
    currentUser: CustomPropTypes.user,
    fetchingCurrentUser: PropTypes.bool.isRequired,
    fetchedCurrentUser: PropTypes.bool.isRequired
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

  componentWillReceiveProps(nextProps) {
    if (this.props.fetchingCurrentUser && !nextProps.fetchingCurrentUser && !nextProps.fetchedCurrentUser) {
      // Direct the user to the sign up page because they failed to authenticate
      dispatch(replace('/sign_up'));
    }
  }

  render() {
    const {children, currentUser, fetchedCurrentUser, fetchingCurrentUser} = this.props;
    
    if (!fetchingCurrentUser && fetchedCurrentUser && currentUser) return children;
    
    return <div>Loading...</div>;
  }
}
