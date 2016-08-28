// @flow
import React, { PureComponent, PropTypes } from 'react';
import { AppBar } from 'material-ui';
import AppDrawer from './AppDrawer';

export default class AppBarHeader extends PureComponent {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  state = {
    drawerOpen: false,
  }
  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }
  close = () => {
    this.setState({
      drawerOpen: false,
    });
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
          open={this.state.drawerOpen}
          closeWindow={this.close}
        />
      </div>
    );
  }
}
