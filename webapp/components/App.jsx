import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {init} from '../actions/app';
import GraphContainer from './graphContainer.component.js';
import Header from './header.component.js';
import AddGraph from './add.graph.component.js';

import {getGraph, removeGraph} from './../actions/graph.actions';

class App extends React.Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.closeAddGraphModal = this.closeAddGraphModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getGraph());
  }

  closeAddGraphModal() {
    this.props.dispatch(removeGraph());
  }

  render() {
    const {graph} = this.props;

    if (graph.actionInProgress) {
      return (<AddGraph closeCb={this.closeAddGraphModal}/>);
    }

    return (
      <div>
        <Header />
        <GraphContainer />
      </div>
    );
  }
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => {
  return {
    graph: state.graph,
  }
})(App);