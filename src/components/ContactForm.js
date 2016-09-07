// @flow
import React, { PureComponent, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import PaperContainer from './PaperContainer';

const styles = StyleSheet.create({
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
});

@withRouter
@observer(['contactsStore'])
export default class NewContext extends PureComponent {
  static propTypes = {
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
  state = {
    phoneNumber: '',
    phoneType: 'Mobile',
    firstName: '',
    lastName: '',
  }
  componentWillMount() {
    const { contactId } = this.props.params;

    if (contactId) {
      this.props.contactsStore
        .getContact(contactId)
        .then(currentContact => {
          if (currentContact.errorMsg) {
            this.props.router.push('/');
          }
          this.setState({
            firstName: currentContact.firstName,
            lastName: currentContact.lastName,
            phoneType: currentContact.phoneType,
            phoneNumber: currentContact.phoneNumber,
          });
        });
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { firstName, lastName, phoneType, phoneNumber } = this.state;

    const { contactId } = this.props.params;

    if (contactId) {
      this.props.contactsStore.updateContact({
        contactId,
        firstName,
        lastName,
        phoneType,
        phoneNumber,
      });
    } else {
      this.props.contactsStore.addContact({
        firstName,
        lastName,
        phoneType,
        phoneNumber,
      });
    }
    this.props.router.push('/');
  }
  handlePhoneTypeChange =
    (event: Event, index: number, value: string) =>
      this.setState({ phoneType: value });

  render() {
    return (
      <PaperContainer>
        <form onSubmit={this.handleSubmit}>
          <TextField
            onChange={(event) => {
              this.setState({
                firstName: event.target.value,
              });
            }}
            value={this.state.firstName}
            floatingLabelText="First Name"
            fullWidth
          />
          <br />
          <TextField
            onChange={(event) => {
              this.setState({
                lastName: event.target.value,
              });
            }}
            value={this.state.lastName}
            floatingLabelText="Last Name"
            fullWidth
          />
          <br />
          <div className={css(styles.phoneContainer)}>
            <TextField
              onChange={(event) => {
                this.setState({
                  phoneNumber: event.target.value,
                });
              }}
              value={this.state.phoneNumber}
              floatingLabelText="Phone Number"
              className={css(styles.phoneTextField)}
              type={'tel'}
            />
            <SelectField
              className={css(styles.selectField)}
              value={this.state.phoneType}
              onChange={this.handlePhoneTypeChange}
            >
              <MenuItem value={'Mobile'} primaryText="Mobile" />
              <MenuItem value={'Home'} primaryText="Home" />
              <MenuItem value={'Work'} primaryText="Work" />
              <MenuItem value={'Fax'} primaryText="Fax" />
            </SelectField>
          </div>
          <br />
          <div className={css(styles.buttonContainer)}>
            <RaisedButton
              className={css(styles.primaryButton)}
              type="submit"
              label="Save"
              primary
            />
            <RaisedButton label="Cancel" href="#list" />
          </div>
        </form>
      </PaperContainer>
    );
  }
}
