// @flow
import React, { PureComponent, PropTypes } from 'react';
import { FlatButton, Dialog } from 'material-ui';
import { observer } from 'mobx-react';

@observer(['uiState'])
export default class DialogConfirmation extends PureComponent {
  static propTypes = {
    uiState: PropTypes.shape({
      closeDialog: PropTypes.func.isRequired,
      dialogOpen: PropTypes.bool.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string,
    removeUser: PropTypes.func.isRequired,
  }
  handleCancel = () => {
    this.props.uiState.closeDialog();
  }
  handleClose = () => {
    this.props.uiState.closeDialog();
  }
  handleSubmit = () => {
    const { removeUser, uiState } = this.props;

    removeUser(uiState.dialogId);
    uiState.closeDialog();
  }
  render() {
    const { title, paragraph } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.props.uiState.dialogOpen}
        onRequestClose={this.handleClose}
      >
      {paragraph}
      </Dialog>
    );
  }
}
