import React from 'react';
import { render } from 'react-dom';
import Theme from './Theme';
import { Router, Route, useRouterHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import UiState from './stores/UiState';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import Settings from './components/Settings';
import { createHashHistory } from 'history';

useStrict(true);

injectTapEventPlugin();

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const uiState = new UiState('lightBaseTheme', false);

const stores = {
  uiState,
};

render(
  <Provider { ...stores }>
    <Router history={appHistory}>
      <Route path="/" component={Theme}>
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
