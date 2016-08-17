import React, { Component } from 'react';
import App from './App';
import { MuiThemeProvider } from 'material-ui/styles';
import { observer } from 'mobx-react';

@observer(['uiState'])
export default class Theme extends Component {
  render() {
    const { themeObject } = this.props.uiState;

    return (
      <MuiThemeProvider muiTheme={themeObject}>
        <App { ...this.props }/>
      </MuiThemeProvider>
    );
  }
}
