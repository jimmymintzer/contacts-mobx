// @flow
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import App from './App';

useStrict(true);

injectTapEventPlugin();

render(
  <App />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
