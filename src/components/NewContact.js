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

@observer(['uiState', 'contacts'])
export default class NewContext extends PureComponent {
  static propTypes = {
    uiState: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
  }
  handleFirstNameChange = (event) => this.props.uiState.setFirstname(event.target.value);
  handleLastNameChange = (event) => this.props.uiState.setLastName(event.target.value);
  handlePhoneNumberChange = (event) => this.props.uiState.setPhoneNumber(event.target.value);
  handleSelectValueChange = (event, index, value) => this.props.uiState.setPhoneType(value);
  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, phoneType, phoneNumber } = this.props.uiState;
    this.props.contacts.addContact(firstName, lastName, phoneType, phoneNumber);
  }
  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      phoneType,
      phoneNumberErrorMessage,
    } = this.props.uiState;

    return (
      <PaperContainer>
        <form onSubmit={this.handleSubmit}>
          <TextField
            value={firstName}
            onChange={this.handleFirstNameChange}
            floatingLabelText="First Name"
            fullWidth
          />
          <br />
          <TextField
            value={lastName}
            onChange={this.handleLastNameChange}
            floatingLabelText="Last Name"
            fullWidth
          />
          <br />
          <div style={styles.phoneContainer} className="phone-container">
            <TextField
              value={phoneNumber}
              onChange={this.handlePhoneNumberChange}
              floatingLabelText="Phone Number"
              style={styles.phoneTextField}
              hintText={'(xxx) xxx-xxxx'}
              errorText={phoneNumberErrorMessage}
              type={'tel'}
            />
            <SelectField
              value={phoneType}
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
              type="submit"
              label="Save"
              primary
            />
            <RaisedButton label="Cancel" />
          </div>
        </form>
      </PaperContainer>
    );
  }
}
