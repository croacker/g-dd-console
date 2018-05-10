import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  nameColumn: {width:200}
} 

/**
 * Диалоговое окно с информацие о узле.
 */
export default class NodeInfoDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          ddNode: props.ddNode
        };
        this.openDialog = this.openDialog.bind(this);
      }

      /**
       * Открыть диалог.
       */
      openDialog = () => {
        this.setState({open: true});
      };

      /**
       * Закрыть диалог.
       */
      handleClose = () => {
        this.setState({open: false});
      };

    render() {
        const actions = [
            <FlatButton
              label="ОК"
              primary={false}
              onClick={this.handleClose}
            />
          ];
      
        return(
            <div>
            <Dialog
              title={this.state.ddNode.name}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            <Table>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={style.nameColumn}>URL</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.url}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>subSystem</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.subSystem}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>taskActive</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.taskActiveLocalized}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>mode</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.mode}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>thread</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.thread}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>waitObject</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.waitObject}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>countObject</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.countObject}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>sentObject</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.sentObject}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>lastStartMillis</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.lastStartMillis}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>receivedObject</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.receivedObject}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>lastSendMillis</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.lastSendMillis}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>lastReceiveMillis</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.lastReceiveMillis}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>countObjectTotal</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.countObjectTotal}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>receivedObjectTotal</TableRowColumn>
                  <TableRowColumn>{this.state.ddNode.receivedObjectTotal}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            </Dialog>
          </div>            
        );
    } 
}
