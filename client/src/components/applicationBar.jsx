import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AboutDialog from  './aboutDialog.jsx';

/**
 * Стили.
 */
const appBarStyle = {
  backgroundColor: '#7AB800' 
}

/**
 * Кнопка выпадающего меню.
 */
const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Крок" href="https://croc.ru/" target="_blank"/>
    <AboutDialog />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * Главное меню-панель приложения и кнопки на нем.
 */
class ApplicationBar extends Component {
  state = {
    logged: true,
  };

  /**
   * Изменение состояния.
   */
  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        <AppBar
          style = {appBarStyle}
          title="Транснефть, распределенный документооборот"
          iconElementRight={<Logged />}          
        />
      </div>
    );
  }
}

export default ApplicationBar;