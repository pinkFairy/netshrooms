import React from 'react';
import {connect} from 'react-redux';

import {init} from '../actions/app';
import GraphContainer from './graphContainer.component.js';
import Header from './header.component.js';

class App extends React.Component {
  render() {
    return (
      <div>
       <Header />
       <GraphContainer />
      </div>
    );
  }
};

export default App;