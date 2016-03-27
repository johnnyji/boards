import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator'
import TextField from 'material-ui/lib/text-field';
import {register, updateField} from 'js/actions/RegistrationActionCreators';

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
    const {user, errors} = this.props;
    console.log(JSON.stringify(errors.toJS(), null, 2))

    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <h1>Welcome to Boards ya'll!</h1>
          <TextField
            type='text'
            onChange={this._handleChange}
            name='firstName'
            errorText={errors.get('firstName')}
            hintText='First Name'
            value={user.get('firstName')}/>
          <TextField
            type='text'
            onChange={this._handleChange}
            name='lastName'
            errorText={errors.get('lastName')}
            hintText='Last Name'
            value={user.get('lastName')}/>
          <TextField
            type='email'
            onChange={this._handleChange}
            name='email'
            errorText={errors.get('email')}
            hintText='Email'
            value={user.get('email')}/>
          <TextField
            type='password'
            onChange={this._handleChange}
            name='encryptedPassword'
            errorText={errors.get('encryptedPassword')}
            hintText='Password'
            value={user.get('encryptedPassword')}/>
          <TextField
            type='password'
            onChange={this._handleChange}
            name='encryptedPasswordConfirmation'
            errorText={errors.get('encryptedPasswordConfirmation')}
            hintText='Confirm'
            value={user.get('encryptedPasswordConfirmation')}/>
          <input
            type='submit'
            value='Register'/>
        </form>
        <button onClick={this._handleSessionView}>Already got an account?</button>
      </div>
    );
  }

  _handleChange = (event) => {
    const {name, value} = event.target;
    this.props.dispatch(updateField(name, value));
  };

  _handleSessionView = () => {
    this.props.dispatch(push('/sign_in'));
  };

  _handleSubmit = (event) => {
    event.preventDefault();

    const {dispatch, user} = this.props;
    dispatch(register(user.toJS()));
  };

}
