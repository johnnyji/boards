import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator'
import {updateField} from 'js/actions/SessionActionCreators';

const displayName = 'SessionNew';

@connect((state) => ({
  errors: state.registration.getIn(['signInForm', 'errors']),
  session: state.session.getIn(['signInForm', 'values'])
}))
@pureRender
export default class RegistrationsNew extends Component {
  static displayName = displayName;

  static propTypes = {
    errors: ImmutablePropTypes.contains({
      email: PropTypes.string,
      password: PropTypes.string
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    values: ImmutablePropTypes.contains({
      email: PropTypes.string,
      password: PropTypes.string
    }).isRequired
  };

  render() {
    const {values} = this.props;

    return (
      <form onSubmit={this._handleSubmit}>
        <h1>Sign In</h1>
        <input
          type='email'
          onChange={this._handleChange}
          name='email'
          placeholder='Email'
          value={values.get('email')}/>
        <input
          type='password'
          onChange={this._handleChange}
          name='password'
          placeholder='Password'
          value={values.get('password')}/>
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

    const {dispatch, values} = this.props;
    dispatch(signIn(values.toJS()));
  };

}
