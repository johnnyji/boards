import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from 'js/utils/CustomPropTypes';
import pureRender from 'pure-render-decorator'
import TextField from 'material-ui/lib/text-field';
import {register, updateField} from 'js/actions/RegistrationActionCreators';

const displayName = 'RegistrationsNew';
const formFieldProps = ImmutablePropTypes.contains({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  encryptedPassword: PropTypes.string,
  encryptedPasswordConfirmation: PropTypes.string,
  email: PropTypes.string
}).isRequired;

@connect((state) => ({
  currentUser: state.session.get('currentUser'),
  errors: state.registration.get('errors'),
  user: state.registration.get('user'),
  registering: state.registration.get('registering'),
  registered: state.registration.get('registered')
}))
@pureRender
export default class RegistrationsNew extends Component {
  static displayName = displayName;

  static propTypes = {
    currentUser: CustomPropTypes.user,
    dispatch: PropTypes.func.isRequired,
    errors: formFieldProps,
    user: formFieldProps,
    registering: PropTypes.bool.isRequired,
    registered: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && nextProps.registered) {
      this.props.dispatch(replace('/'));
    }
  }

  render() {
    const {user, errors, registering} = this.props;
    
    return (
      <div>
        {registering && <h4>Registering...</h4>}
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
