import React, { PureComponent, PropTypes } from 'react';
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
  },
};

@observer(['uiState'])
export default class Settings extends PureComponent {
  static propTypes = {
    uiState: PropTypes.object.isRequired,
  }
  handleToggle = () => {
    this.props.uiState.toggleTheme();
  }
  render() {
    return (
      <div style={styles.root}>
        <Paper style={styles.paper} zDepth={1}>
          <List>
            <Subheader>General</Subheader>
            <ListItem
              primaryText="Dark Mode"
              rightToggle={
                <Toggle
                  onToggle={this.handleToggle}
                  toggled={this.props.uiState.isDarkMode}
                />
              }
            />
          </List>
        </Paper>
      </div>
    );
  }
}
