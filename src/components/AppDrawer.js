import React from 'react';
import {
  Drawer,
  MenuItem,
  Divider,
  AppBar,
} from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Settings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

const styles = {
  link: {
    textDecoration: 'none',
  },
};

const AppDrawer = observer(({ open, closeWindow }) =>
  <Drawer width={225} docked={false} open={open} onRequestChange={(oState) => closeWindow()}>
    <AppBar title={"Contacts"} showMenuIconButton={false} />

    <Link style={styles.link} to="/" onClick={closeWindow}>
      <MenuItem primaryText="Home" leftIcon={ <ActionHome /> } />
    </Link>

    <Link style={styles.link} to="new" onClick={closeWindow}>
      <MenuItem primaryText="New Contact" leftIcon={ <PersonAdd /> } />
    </Link>

    <Divider />

    <Link style={styles.link} to="settings" onClick={closeWindow}>
      <MenuItem primaryText="Settings" leftIcon={ <Settings /> } />
    </Link>
  </Drawer>
);

export default AppDrawer;
