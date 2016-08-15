import React, { Component } from 'react';
import { List, Subheader, ListItem, Toggle, Paper } from 'material-ui';
import { observer } from 'mobx-react';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paper: {
    width: '80%',
    marginTop: '20px',
  }
};

@observer
export default class Settings extends Component {
  handleToggle = () => {
    this.props.toggleTheme();
  }
  render() {
    return (
      <div style={styles.root}>
        <Paper style={styles.paper} zDepth={1}>
          <List>
            <Subheader>General</Subheader>
            <ListItem primaryText="Dark Mode" rightToggle={
              <Toggle onToggle={this.handleToggle} toggled={this.props.uiState.isDarkMode()}/>
            } />
          </List>
        </Paper>
      </div>
    );
  }
}
