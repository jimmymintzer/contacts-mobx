import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import AppBarHeader from './components/AppBarHeader';
import DevTools from 'mobx-react-devtools';

@observer
export default class App extends Component {
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