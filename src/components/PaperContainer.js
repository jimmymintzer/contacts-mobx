// @flow
import React from 'react';
import { Paper } from 'material-ui';
import { observer } from 'mobx-react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paper: {
    width: '85%',
    margin: '20px 0',
    padding: '10px 10px 40px 10px',
  },
});

const PaperContainer = observer(({ children }) =>
  <div className={css(styles.root)}>
    <Paper className={css(styles.paper)} zDepth={1}>
      {children}
    </Paper>
  </div>
);

export default PaperContainer;
