// @flow
import React, { PureComponent, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import { Subheader, FlatButton } from 'material-ui';
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
    contactsStore: PropTypes.shape({
      contacts: PropTypes.object.isRequired,
    }).isRequired,
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
          <Card key={contact.id}>
            <CardHeader
              title={contact.fullName}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <p>{contact.fullPhoneNumber}</p>
            </CardText>
            <CardActions expandable>
              <FlatButton label="Edit" />
              <FlatButton label="Delete" />
            </CardActions>
          </Card>
        )}
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
      </PaperContainer>
    );
  }
}
