import React, {Component} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from 'js/utils/CustomPropTypes';

const displayName = 'HomeIndex';

@connect((state) => ({
  currentUser: state.session.get('currentUser')
}))
export default class HomeIndex extends Component {

  static displayName = displayName;
  
  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  render() {
    return (
      <div>
        Home Index!
        {this.props.currentUser.get('firstName')}
      </div>
    );
  }
}

