import React, { PropTypes } from 'react';
import { RaisedButton} from 'material-ui';

const ToggleThemeButton = ({ handleClick }) =>
  <RaisedButton onClick={handleClick} label="Toggle Theme" />

ToggleThemeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ToggleThemeButton;
