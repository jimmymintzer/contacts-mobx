import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { pinkA200, transparent } from 'material-ui/styles/colors';

const ContactList = () => (
  <div>
    <List>
      <ListItem
        primaryText="Chelsea Otakan"
        leftIcon={<ActionGrade color={pinkA200} />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        insetChildren
      />
      <ListItem
        primaryText="James Anderson"
        insetChildren
      />
      <ListItem
        primaryText="Kerem Suer"
        insetChildren
      />
    </List>
    <Divider inset />
    <List>
      <ListItem
        primaryText="Adelle Charles"
        leftAvatar={
          <Avatar
            color={pinkA200} backgroundColor={transparent}
            style={{ left: 8 }}
          >
            A
          </Avatar>
        }

      />
      <ListItem
        primaryText="Adham Dannaway"
        insetChildren
      />
      <ListItem
        primaryText="Allison Grayce"
        insetChildren
      />
      <ListItem
        primaryText="Angel Ceballos"
        insetChildren
      />
    </List>
  </div>
);

export default ContactList;
