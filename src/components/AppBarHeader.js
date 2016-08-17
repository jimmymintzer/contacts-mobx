import React, { PureComponent } from 'react';
import { AppBar } from 'material-ui';
import AppDrawer from './AppDrawer';
import { observer } from 'mobx-react';

@observer(['uiState'])
export default class AppBarHeader extends PureComponent {
  toggleDrawer = () => {
    this.props.uiState.toggleDrawerOpen();
  }
  close = () => {
    this.props.uiState.closeDrawer();
  }
  render() {
    return (
      <div>
        <h1>{this.props.uiState.isDarkMode}</h1>
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
