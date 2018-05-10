import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ActionSwapVert from 'material-ui/svg-icons/action/swap-vert';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

const nodesBarStyle = {
    backgroundColor: '#7AB800' 
};

/**
 * Меню групповых действий узлов.
 */
export default class NodesDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  /**
   * Открыть меню действий с выбранными элементами.
   */
  openDrawer = () => {
    this.state.open = true;
    this.setState({open: this.state.open});
  };

  /**
   * Скрыть меню действий с выбранными элементами.
   */
  hideDrawer = () => {
    this.state.open = false;
    this.setState({open: this.state.open});
  };

  /**
   * Отправить запрос на изменение состояния в OFF.
   */
  sendOff = () =>{
    this.props.changeModeSelected('OFF');
    this.hideDrawer();
  }

  /**
   * Отправить запрос на изменение состояния в SINGLE.
   */
  sendSingle = () =>{
    this.props.changeModeSelected('SINGLE');
    this.hideDrawer();
  }

  /**
   * Отправить запрос на изменение состояния в CONTINUOUS.
   */
  sendContinious = () =>{
    this.props.changeModeSelected('CONTINUOUS');
    this.hideDrawer();
  }

  render() {
    return (
      <div>
        <Drawer width={300} 
        open={this.state.open}>
          <AppBar style={nodesBarStyle} title="Управление" showMenuIconButton={false}/>
          <List>
            <ListItem primaryText="OFF" leftIcon={<ActionHighlightOff />} onClick={this.sendOff}/>
            <ListItem primaryText="SINGLE" leftIcon={<ActionSwapVert />} onClick={this.sendSingle}/>
            <ListItem primaryText="CONTINUOUS" leftIcon={<ActionThumbUp />} onClick={this.sendContinious}/>
          </List>
        </Drawer>
      </div>
    );
  }
};