import { MuiThemeProvider } from 'material-ui/styles';
import { observer } from 'mobx-react';
import React, { PureComponent, PropTypes } from 'react';
import App from './App';

@observer(['uiState'])
export default class Theme extends PureComponent {
  static propTypes = {
    uiState: PropTypes.object.isRequired,
  }
  render() {
    const { themeObject } = this.props.uiState;

    return (
      <MuiThemeProvider muiTheme={themeObject}>
        <App {...this.props} />
      </MuiThemeProvider>
    );
  }
}
