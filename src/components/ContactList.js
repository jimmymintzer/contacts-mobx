// @flow
import React, { PureComponent, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import { Subheader } from 'material-ui';
import { observer } from 'mobx-react';
import PaperContainer from './PaperContainer';

const styles = {
  emptyView: {
    paddingLeft: '16px',
  },
};

@observer(['contactsStore'])
export default class ContactList extends PureComponent {
  static propTypes = {
    contactsStore: PropTypes.object.isRequired,
  }
  renderEmptyView() {
    return (
      <p style={styles.emptyView}>No contacts found. <Link to="new">Add a new contact.</Link></p>
    );
  }
  renderList(contacts: Array<Object>) {
    return (
      <List>
        {contacts.map(contact =>
          <ListItem key={contact.id} primaryText={contact.fullName} />
        )}
      </List>
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
      </PaperContainer>
    );
  }
}
