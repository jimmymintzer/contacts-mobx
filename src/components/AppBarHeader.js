import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import AppDrawer from './AppDrawer';

export default class AppBarHeader extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  handleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  closeWindow = (open) => {
    this.setState({
      open: false,
    });
  }
  render() {
    return (
      <div>
        <AppBar
          title="Contacts"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleDrawer}
        />
        <AppDrawer
          open={this.state.open}
          closeWindow={this.closeWindow}
        />
        {this.props.children}
      </div>
    );
  }
}
