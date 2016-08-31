// @flow
import React, { PureComponent, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Link, withRouter } from 'react-router';
import { Subheader, RaisedButton, FloatingActionButton, Avatar } from 'material-ui';
import { observer } from 'mobx-react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { StyleSheet, css } from 'aphrodite';

import PaperContainer from './PaperContainer';
import DialogConfirmation from './DialogConfirmation';

const styles = StyleSheet.create({
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
});

@withRouter
@observer(['contactsStore', 'uiState'])
export default class ContactList extends PureComponent {
  static propTypes = {
    contactsStore: PropTypes.shape({
      contacts: PropTypes.object.isRequired,
      removeContact: PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    uiState: PropTypes.shape({
      getColor: PropTypes.func.isRequired,
    }),
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
        className={css(styles.emptyView)}
      >No contacts found. Try adding a <Link to="new">new contact</Link>.</p>
    );
  }
  renderList(contacts: Array<Object>) {
    const { getColor } = this.props.uiState;

    return (
      <div>
        {contacts.map((contact, index) =>
          <Card className={css(styles.card)} key={contact.id}>
            <CardHeader
              title={contact.fullName}
              actAsExpander
              showExpandableButton
              textStyle={{ verticalAlign: 'middle' }}
              avatar={
                <Avatar
                  backgroundColor={getColor(index)}
                >{contact.firstInitial}</Avatar>
              }
            />
            <CardText expandable>
            {
              (contact.phoneNumber) ?
                <div>
                  <h3 className={css(styles.phoneType)}>{contact.phoneType}:</h3>
                  <p className={css(styles.phoneNumber)}>{contact.phoneNumber}</p>
                </div>
                :
                <div />
            }


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
    const { contacts, loading } = this.props.contactsStore;
    return (
      <PaperContainer>
        <Subheader>Contacts</Subheader>
        {
          (contacts.length === 0 && !loading) ?
          this.renderEmptyView() :
          this.renderList(contacts)
        }
        <div className={css(styles.buttonContainer)}>
          <FloatingActionButton href="#new" className={css(styles.floatingButton)}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </PaperContainer>
    );
  }
}
