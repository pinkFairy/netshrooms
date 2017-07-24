import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {init} from '../actions/app';
import GraphContainer from './graphContainer.component.js';
import Header from './header.component.js';
import AddGraph from './add.graph.component.js';

import {getGraph} from './../actions/graph.actions';

class App extends React.Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.closeAddGraphModal = this.closeAddGraphModal.bind(this);
    this.state = {
      modalClosed: false
    }
  }

  componentWillMount() {
    this.props.dispatch(getGraph());
  }

  closeAddGraphModal() {
    this.setState({
      modalClosed: true,
    });
  }

  render() {
    const {graph} = this.props;
    const {modalClosed} = this.state;

    if (graph.data || modalClosed) {
      return (
        <div>
          <Header />
          <GraphContainer />
        </div>
      );
    }

    return (<AddGraph closeCb={this.closeAddGraphModal}/>);
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