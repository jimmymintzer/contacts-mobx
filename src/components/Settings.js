// @flow
import React, { PureComponent, PropTypes } from 'react';
import { List, Subheader, ListItem, Toggle } from 'material-ui';
import { observer } from 'mobx-react';
import PaperContainer from './PaperContainer';

@observer(['uiState', 'contactsStore'])
export default class Settings extends PureComponent {
  static propTypes = {
    uiState: PropTypes.shape({
      toggleTheme: PropTypes.func.isRequired,
      isDarkMode: PropTypes.bool.isRequired,
    }).isRequired,
    contactsStore: PropTypes.shape({
      resetContacts: PropTypes.func.isRequired,
    }),
  }
  handleToggle = () => {
    this.props.uiState.toggleTheme();
  }
  render() {
    return (
      <PaperContainer>
        <List>
          <Subheader>General</Subheader>
          <ListItem
            primaryText="Dark Mode"
            rightToggle={
              <Toggle
                onToggle={this.handleToggle}
                toggled={this.props.uiState.isDarkMode}
              />
            }
          />
          <ListItem
            primaryText="Reset Contacts List"
            secondaryText="This action is permanent and CANNOT be undone."
            onClick={this.props.contactsStore.resetContacts}
          />
        </List>
      </PaperContainer>
    );
  }
}
