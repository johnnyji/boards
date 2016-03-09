import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator'
import {register} from '../../actions/AuthActionCreators';
import {updateField} from '../../actions/RegistrationActionCreators';

const displayName = 'RegistrationsNew';

@connect((state) => ({
  errors: state.registration.get('errors'),
  user: state.registration.get('user')
}))
@pureRender
export default class RegistrationsNew extends Component {
  static displayName = displayName;

  static propTypes = {
    errors: ImmutablePropTypes.contains({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      encryptedPassword: PropTypes.string,
      encryptedPasswordConfirmation: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    user: ImmutablePropTypes.contains({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      encryptedPassword: PropTypes.string,
      encryptedPasswordConfirmation: PropTypes.string,
      email: PropTypes.string
    }).isRequired
  };

  render() {
    const {user} = this.props;

    return (
      <form onSubmit={this._handleSubmit}>
        <h1>Welcome to Boards ya'll!</h1>
        <input
          type='text'
          onChange={this._handleChange}
          name='firstName'
          placeholder='First Name'
          value={user.get('firstName')}/>
        <input
          type='text'
          onChange={this._handleChange}
          name='lastName'
          placeholder='Last Name'
          value={user.get('lastName')}/>
        <input
          type='email'
          onChange={this._handleChange}
          name='email'
          placeholder='Email'
          value={user.get('email')}/>
        <input
          type='password'
          onChange={this._handleChange}
          name='encryptedPassword'
          placeholder='Password'
          value={user.get('encryptedPassword')}/>
        <input
          type='password'
          onChange={this._handleChange}
          name='encryptedPasswordConfirmation'
          placeholder='Confirm'
          value={user.get('encryptedPasswordConfirmation')}/>
        <input
          type='submit'
          value='Register'/>
      </form>
    );
  }

  _handleChange = (event) => {
    const {name, value} = event.target;
    this.props.dispatch(updateField(name, value));
  };

  _handleSubmit = (event) => {
    event.preventDefault();

    const {dispatch, user} = this.props;
    dispatch(register(user.toJS()));
  };

}