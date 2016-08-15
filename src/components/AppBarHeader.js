import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import AppDrawer from './AppDrawer';
import { observer, inject } from 'mobx-react';

@inject('uiState')
@observer
export default class AppBarHeader extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      open: props.uiState.drawerOpen,
    };
  }
  toggleDrawer = () => {
    this.setState({
      open: this.props.uiState.toggleDrawerOpen(),
    });
  }
  close = () => {
    this.setState({
      open: this.props.uiState.closeDrawer(),
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
          open={this.state.open}
          closeWindow={this.close}
        />
      </div>
    );
  }
}
