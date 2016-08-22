// @flow
import React, { PureComponent, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { AppBar } from 'material-ui';
import AppDrawer from './AppDrawer';

@observer(['uiState'])
export default class AppBarHeader extends PureComponent {
  static propTypes = {
    uiState: PropTypes.shape({
      toggleDrawerOpen: PropTypes.func.isRequired,
      closeDrawer: PropTypes.func.isRequired,
      drawerOpen: PropTypes.bool.isRequired,
    }).isRequired,
  }
  toggleDrawer = () => {
    this.props.uiState.toggleDrawerOpen();
  }
  close = () => {
    this.props.uiState.closeDrawer();
  }
  render() {
    return (
      <div>
        <AppBar
          title="Contacts"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleDrawer}
        />
        <AppDrawer
          open={this.props.uiState.drawerOpen}
          closeWindow={this.close}
        />
      </div>
    );
  }
}
