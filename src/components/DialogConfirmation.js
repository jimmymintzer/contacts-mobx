// @flow
import React, { PureComponent, PropTypes } from 'react';
import { FlatButton, Dialog } from 'material-ui';
import { observer } from 'mobx-react';

@observer(['uiState'])
export default class DialogConfirmation extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string,
    closeDialog: PropTypes.func.isRequired,
    removeContact: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }
  handleCancel = () => {
    this.props.closeDialog();
  }
  handleClose = () => {
    this.props.closeDialog();
  }
  handleSubmit = () => {
    this.props.removeContact();
    this.props.closeDialog();
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
        open={this.props.open}
        onRequestClose={this.handleClose}
      >
      {paragraph}
      </Dialog>
    );
  }
}
