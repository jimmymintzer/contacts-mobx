import React from 'react';
import { observer, Provider } from 'mobx-react';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Root from './components/Root';
import Settings from './components/Settings';
import UiState from './stores/UiState';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const uiState = new UiState('lightBaseTheme', false);

const stores = {
  uiState,
};

const App = observer(() =>
  <Provider {...stores}>
    <Router history={appHistory}>
      <Route path="/" component={Root}>
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  </Provider>
);

export default App;
