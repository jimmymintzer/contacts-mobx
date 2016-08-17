import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import AppBarHeader from './components/AppBarHeader';
import DevTools from 'mobx-react-devtools';

@observer
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <DevTools />
        <AppBarHeader />
        {this.props.children}
      </div>
    );
  }
}
