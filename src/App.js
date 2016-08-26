// @flow
import React from 'react';
import { observer, Provider } from 'mobx-react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Root from './components/Root';
import Settings from './components/Settings';
import UiState from './stores/UiState';
import ContactsStore from './stores/ContactsStore';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const uiState = new UiState('lightBaseTheme', false);
const contactsStore = new ContactsStore();

const stores = {
  uiState,
  contactsStore,
};

const App = observer(() =>
  <Provider {...stores}>
    <Router history={appHistory}>
      <Route path="/" component={Root}>
        <IndexRoute component={ContactList} />
        <Route path="list" component={ContactList} />
        <Route path="new" component={ContactForm} />
        <Route path="settings" component={Settings} />
        <Route path="edit/:contactId" component={ContactForm} />
      </Route>
    </Router>
  </Provider>
);

export default App;
