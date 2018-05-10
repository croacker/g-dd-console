import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import NodeInfoDialog from './../dialog/nodeInfoDialog.jsx';

const buttonStyle = {
    width: 25    
}

/**
 * Компонент, кнопка в ячейки таблицы, с выпадающим меню, для изменения режима узла.
 */
export default class NodeMenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          ddNode: props.ddNode
        };
      }

      /**
      * Открыть меню.
      */
      handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };

      /**
       * Закрыть меню.
       */
      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };

      /**
      * Открыть окно с полной информацией о узле..
      */
      showInfoDialog = () => {
        this.handleRequestClose();
        this.refs.nodeInfoDialog.openDialog();
      };

      /**
       * Запросить состояние узла.
       */
      refreshNode = () => {
        this.handleRequestClose();
        this.props.refreshNode(this.props.ddNode);
      };

      /**
      * Отправить запрос на изменение состояния в OFF.
      */
      setOffMode = () => {
        this.handleRequestClose();
        this.props.changeMode('OFF', this.props.ddNode);
      };

      /**
       * Отправить запрос на изменение состояния в SINGLE.
       */
      setSingleMode = () => {
        this.handleRequestClose();
        this.props.changeMode('SINGLE', this.props.ddNode);
      };

      /**
       * Отправить запрос на изменение состояния в CONTINUOUS.
       */
      setContiniousMode = () => {
        this.handleRequestClose();
        this.props.changeMode('CONTINUOUS', this.props.ddNode);
      };

      render() {
        return (
          <div>
              <NodeInfoDialog ddNode={this.props.ddNode} 
              ref="nodeInfoDialog"/>
              <IconButton
              onClick={this.handleTouchTap}
              label={"..."}
              style={buttonStyle}
              ><MoreVertIcon/></IconButton>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <MenuItem primaryText='Информация' value={'showInfo'} onClick={this.showInfoDialog}/>
                <MenuItem primaryText='Обновить' value={'refresh'} onClick={this.refreshNode}/>
                <Divider/>
                <MenuItem primaryText='OFF' value={'OFF'} onClick={this.setOffMode}/>
                <MenuItem primaryText='SINGLE' value={'SINGLE'} onClick={this.setSingleMode}/>
                <MenuItem primaryText='CONTINUOUS' value={'CONTINUOUS'} onClick={this.setContiniousMode}/>
              </Menu>
            </Popover>
          </div>
        );
      }
}