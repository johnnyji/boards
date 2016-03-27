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
    
    if (this.props.currentUser) return;
    
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
    const {currentUser, dispatch} = this.props;
    const {currentUser: nextCurrentUser} = nextProps;
    
    if (!currentUser && nextCurrentUser) return dispatch(replace('/'));
    if (currentUser && !nextCurrentUser) return dispatch(replace('/sign_up'));
  }

  render() {
    if (!this.props.currentUser) return <div>Loading...</div>;

    return this.props.children; 
  }
}
