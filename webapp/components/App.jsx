import React from 'react';
import {connect} from 'react-redux';

import {init} from '../actions/app';
import GraphContainer from './graphContainer.component.js';
import Header from './header.component.js';
import AddGraph from './add.graph.component.js';

class App extends React.Component {
  render() {
    if (localStorage.getItem('cyGraph')) {
      return (
        <div>
          <Header />
          <GraphContainer />
        </div>
      );
    }

    return (<AddGraph />);
  }
};

export default App;