// @flow
import React, { PureComponent, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Link, withRouter } from 'react-router';
import { Subheader, RaisedButton, FloatingActionButton } from 'material-ui';
import { observer } from 'mobx-react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PaperContainer from './PaperContainer';
import DialogConfirmation from './DialogConfirmation';

const styles = {
  emptyView: {
    paddingLeft: '16px',
  },
  floatingButton: {
    margin: '0 25px 40px 0',
  },
  buttonContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  card: {
    marginBottom: '10px',
  },
  phoneType: {
    display: 'inline-block',
    marginRight: '10px',
  },
  phoneNumber: {
    display: 'inline-block',
  },
};

@withRouter
@observer(['contactsStore'])
export default class ContactList extends PureComponent {
  static propTypes = {
    contactsStore: PropTypes.shape({
      contacts: PropTypes.object.isRequired,
      removeContact: PropTypes.func.isRequired,
    }).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    dialogOpen: false,
    dialogId: '',
  }

  handleDelete = (id: string) => {
    this.setState({
      dialogOpen: true,
      dialogId: id,
    });
  }
  closeDialog = () => {
    this.setState({
      dialogOpen: false,
      dialogId: '',
    });
  }
  removeContact = () => {
    const { contactsStore } = this.props;
    const { dialogId } = this.state;

    contactsStore.removeContact(dialogId);
  }
  renderEmptyView() {
    return (
      <p
        style={styles.emptyView}
      >No contacts found. Try adding a <Link to="new">new contact</Link>.</p>
    );
  }
  renderList(contacts: Array<Object>) {
    return (
      <div>
        {contacts.map(contact =>
          <Card style={styles.card} key={contact.id}>
            <CardHeader
              title={contact.fullName}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <h3 style={styles.phoneType}>{contact.phoneType}:</h3>
              <p style={styles.phoneNumber}>{contact.phoneNumber}</p>
            </CardText>
            <CardActions expandable>
              <RaisedButton
                label="Edit"
                href={`#edit/${contact.id}`}
              />
              <RaisedButton
                label="Delete"
                secondary
                onClick={() => this.handleDelete(contact.id)}
              />
            </CardActions>
          </Card>
        )}
        <DialogConfirmation
          open={this.state.dialogOpen}
          closeDialog={this.closeDialog}
          removeContact={this.removeContact}
          title={'Are you sure you want to remove this contact?'}
          paragraph={'This action cannot be undone.'}
        />
      </div>
    );
  }
  render() {
    const { contacts } = this.props.contactsStore;

    return (
      <PaperContainer>
        <Subheader>Contacts</Subheader>
        {
          (contacts.length === 0) ?
          this.renderEmptyView() :
          this.renderList(contacts)
        }
        <div style={styles.buttonContainer}>
          <FloatingActionButton href="#new" style={styles.floatingButton}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </PaperContainer>
    );
  }
}
