import React, { Component } from 'react';
import App from './App';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { observer, inject } from 'mobx-react';

@inject('uiState')
@observer
export default class Theme extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      theme: props.uiState.theme,
    };
  }
  toggleTheme = () => {
    this.setState({
      theme: this.props.uiState.toggleTheme(),
    });
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
        <App toggleTheme={this.toggleTheme} {...this.props} />
      </MuiThemeProvider>
    );
  }
}
