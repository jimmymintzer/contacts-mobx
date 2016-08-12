import React from 'react';
import { List, Subheader, ListItem, Toggle, Paper } from 'material-ui';

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

const Settings = () =>
  <div style={styles.root}>
    <Paper style={styles.paper} zDepth={1}>
      <List>
        <Subheader>General</Subheader>
        <ListItem primaryText="Dark Mode" rightToggle={<Toggle />} />
      </List>
    </Paper>
  </div>

export default Settings;
