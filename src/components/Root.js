// @flow
import { MuiThemeProvider } from 'material-ui/styles';
import { observer } from 'mobx-react';
import React from 'react';
import DevTools from 'mobx-react-devtools';
import AppBarHeader from './AppBarHeader';

const Root = observer(['uiState'], ({ uiState, children }) =>
  <div>
    <MuiThemeProvider muiTheme={uiState.themeObject}>
      <div>
        {
          (__DEV__) ? <DevTools /> : null
        }
        <AppBarHeader muiTheme={uiState.themeObject} />
        {children}
      </div>
    </MuiThemeProvider>
  </div>
);

export default Root;
