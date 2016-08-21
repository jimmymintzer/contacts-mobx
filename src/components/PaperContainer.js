import React from 'react';
import { Paper } from 'material-ui';
import { observer } from 'mobx-react';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paper: {
    width: '95%',
    margin: '20px 0',
    padding: '10px 10px 40px 10px',
  },
};

const PaperContainer = observer(({ children }) =>
  <div style={styles.root}>
    <Paper style={styles.paper} zDepth={1}>
      {children}
    </Paper>
  </div>
);

export default PaperContainer;
