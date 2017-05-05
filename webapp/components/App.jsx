import React from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {init} from '../actions/app';
import GraphContainer from './graphContainer.component.js';
import Header from './header.component.js';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
         <Header />
         <GraphContainer />
        </div>
      </MuiThemeProvider>
    );
  }
};

export default App;