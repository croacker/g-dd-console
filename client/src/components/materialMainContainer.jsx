import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApplicationBar from './applicationBar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NodesTable from './list/nodesTable.jsx'

import axios from 'axios';

injectTapEventPlugin();

/**
 * Главный контейнер приложения.
 */
const App = () => (
  <MuiThemeProvider>
    <div>
      <ApplicationBar />
      <NodesTable />      
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

