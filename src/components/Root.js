import { MuiThemeProvider } from 'material-ui/styles';
import { observer } from 'mobx-react';
import React from 'react';
import DevTools from 'mobx-react-devtools';
import AppBarHeader from './AppBarHeader';

const Root = observer(['uiState'], (props) => {
  const { themeObject } = props.uiState;

  return (
    <div>
      <MuiThemeProvider muiTheme={themeObject}>
        <div>
          <DevTools />
          <AppBarHeader />
          {props.children}
        </div>
      </MuiThemeProvider>
    </div>
  );
});

export default Root;
