import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBarHeader from './components/AppBarHeader';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Settings from './components/Settings';

class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: lightBaseTheme,
    };
  }
  handleClick = () => {
    if (this.state.theme === darkBaseTheme) {
      this.setState({
        theme: lightBaseTheme,
      });
    } else {
      this.setState({
        theme: darkBaseTheme,
      });
    }
  }
  render() {
    const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
        <Router history={appHistory}>
          <Route path="/" component={AppBarHeader}>
            <Route path="settings" component={Settings} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
