// @flow
import React from 'react';
import { observer, Provider } from 'mobx-react';
import { Router, hashHistory } from 'react-router';
import Root from './components/Root';
import UiState from './stores/UiState';
import ContactsStore from './stores/ContactsStore';

const uiState = new UiState('lightBaseTheme', false);
const contactsStore = new ContactsStore();

const stores = {
  uiState,
  contactsStore,
};

const routes = {
  path: '/',
  component: Root,
  indexRoute: {
    getComponents: (nextState, cb) => require.ensure([], require => {
      cb(null, require('./components/ContactList').default);
    }),
  },
  childRoutes: [
    {
      path: '/list',
      getComponents: (nextState, cb) => require.ensure([], require => {
        cb(null, require('./components/ContactList').default);
      }),
    },
    {
      path: '/new',
      getComponents: (nextState, cb) => require.ensure([], require => {
        cb(null, require('./components/ContactForm').default);
      }),
    },
    {
      path: '/settings',
      getComponents: (nextState, cb) => require.ensure([], require => {
        cb(null, require('./components/Settings').default);
      }),
    },
    {
      path: 'edit/:contactId',
      getComponents: (nextState, cb) => require.ensure([], require => {
        cb(null, require('./components/ContactForm').default);
      }),
    },
  ],
};

const App = observer(() =>
  <Provider {...stores}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>
);

export default App;
