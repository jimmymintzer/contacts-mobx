import React, { PureComponent, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import PaperContainer from './PaperContainer';

const styles = {
  phoneContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  selectField: {
    alignSelf: 'flex-end',
    width: '30%',
  },
  phoneTextField: {
    width: '40%',
    marginRight: '5%',
  },
  primaryButton: {
    marginRight: '12px',
  },
  buttonContainer: {
    marginTop: '30px',
  },
};

@observer(['uiState'])
export default class NewContext extends PureComponent {
  static propTypes = {
    uiState: PropTypes.object.isRequired,
  }
  handlePhoneNumberChange = (event) =>
    this.props.uiState.setPhoneNumber(event.target.value);
  handleSelectValueChange = (event, index, value) =>
    this.props.uiState.setPhoneNumberSelectValue(value);
  render() {
    return (
      <PaperContainer>
        <TextField
          floatingLabelText="First Name"
          fullWidth
        />
        <br />
        <TextField
          floatingLabelText="Last Name"
          fullWidth
        />
        <br />
        <div style={styles.phoneContainer} className="phone-container">
          <TextField
            onChange={this.handlePhoneNumberChange}
            floatingLabelText="Phone Number"
            style={styles.phoneTextField}
            hintText={'(xxx) xxx-xxxx'}
            errorText={this.props.uiState.phoneNumberErrorMessage}
          />
          <SelectField
            value={this.props.uiState.phoneNumberSelectValue}
            onChange={this.handleSelectValueChange}
            style={styles.selectField}
          >
            <MenuItem value={1} primaryText="Mobile" />
            <MenuItem value={2} primaryText="Home" />
            <MenuItem value={3} primaryText="Work" />
            <MenuItem value={4} primaryText="Fax" />
          </SelectField>
        </div>
        <br />
        <div style={styles.buttonContainer} className="button-container">
          <RaisedButton
            style={styles.primaryButton}
            label="Save"
            primary
          />
          <RaisedButton label="Cancel" />
        </div>
      </PaperContainer>
    );
  }
}
