import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/*
 * Custom PropTypes
 */
export default {
  user: ImmutablePropTypes.contains({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
};
