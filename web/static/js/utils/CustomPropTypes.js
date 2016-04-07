import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CustomPropTypes = {

  board: ImmutablePropTypes.mapContains({
    title: PropTypes.string.isRequired 
  }),

  user: ImmutablePropTypes.mapContains({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })

};

export default CustomPropTypes;
