// @flow
import React, { PureComponent, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';
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

@withRouter
@observer(['uiState', 'contactsStore'])
export default class NewContext extends PureComponent {
  static propTypes = {
    uiState: PropTypes.shape({
      setFirstname: PropTypes.func.isRequired,
      setLastName: PropTypes.func.isRequired,
      setPhoneNumber: PropTypes.func.isRequired,
      setPhoneType: PropTypes.func.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      phoneType: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      resetAllFields: PropTypes.func.isRequired,
      phoneNumberErrorMessage: PropTypes.string.isRequired,
    }).isRequired,
    contactsStore: PropTypes.shape({
      addContact: PropTypes.func.isRequired,
      getContact: PropTypes.func.isRequired,
      updateContact: PropTypes.func.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      contactId: PropTypes.string,
    }),
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }
  componentWillMount() {
    const { contactId } = this.props.params;

    if (contactId) {
      const currentContact = this.props.contactsStore.getContact(contactId);

      this.props.uiState.setFirstname(currentContact.firstName);
      this.props.uiState.setLastName(currentContact.lastName);
      this.props.uiState.setPhoneType(currentContact.phoneType);
      this.props.uiState.setPhoneNumber(currentContact.phoneNumber);
    }
  }
  componentWillUnmount() {
    this.props.uiState.resetAllFields();
  }
  handleFirstNameChange = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.props.uiState.setFirstname(target.value);
    }
  }
  handleLastNameChange = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.props.uiState.setLastName(target.value);
    }
  }
  handlePhoneNumberChange = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.props.uiState.setPhoneNumber(target.value);
    }
  };
  handleSelectValueChange = (event: Event, index: number, value: string) =>
    this.props.uiState.setPhoneType(value);
  handleSubmit = (event: Event) => {
    event.preventDefault();

    const { contactId } = this.props.params;
    const { firstName, lastName, phoneType, phoneNumber } = this.props.uiState;

    if (contactId) {
      this.props.contactsStore.updateContact(
        contactId, firstName, lastName, phoneType, phoneNumber
      );
    } else {
      this.props.contactsStore.addContact(
        firstName, lastName, phoneType, phoneNumber
      );
    }
    this.props.router.push('/');
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
              // hintText={'(xxx) xxx-xxxx'}
              errorText={phoneNumberErrorMessage}
              type={'tel'}
            />
            <SelectField
              value={phoneType}
              onChange={this.handleSelectValueChange}
              style={styles.selectField}
            >
              <MenuItem value={'Mobile'} primaryText="Mobile" />
              <MenuItem value={'Home'} primaryText="Home" />
              <MenuItem value={'Work'} primaryText="Work" />
              <MenuItem value={'Fax'} primaryText="Fax" />
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
            <RaisedButton
              label="Cancel"
              href="#list"
            />
          </div>
        </form>
      </PaperContainer>
    );
  }
}
