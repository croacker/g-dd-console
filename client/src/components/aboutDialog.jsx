import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

/**
 * Диалог "о программе".
 */
export default class AboutDialog extends React.Component {
    state = {
        open: false,
    };

    /**
     * Открыть диалог.
     */
    handleOpen = () => {
        this.setState({ open: true });
    };

    /**
     * Закрыть диалог.
     */
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Закрыть"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <MenuItem primaryText="О'б" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Приложение для управления Распределенным документооборотом проекта Транснефть"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Версия: 0.0.1
                </Dialog>
            </div>
        );
    }
}