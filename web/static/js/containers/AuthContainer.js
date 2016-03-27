import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import CustomPropTypes from 'js/utils/CustomPropTypes';
import {fetchCurrentUser} from 'js/actions/AuthActionCreators';

@connect((state) => ({
  currentUser: state.session.get('currentUser')
}))
export default class AuthContainer extends Component {

  static displayName = 'AuthContainer';

  static propTypes = {
    currentUser: CustomPropTypes.user,
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {currentUser, dispatch} = this.props; 
    
    if (currentUser) return;

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
