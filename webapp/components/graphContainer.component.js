import React,{Component} from 'react';
import cytoscape from 'cytoscape';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {getGraph} from './../actions/graph.actions';
import {getDefaultLayout} from './../actions/layout.actions';

// components
import EditGraph from './editGraph.component';

class GraphContainer extends React.Component{
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    // get dependencies
    this.props.dispatch(getDefaultLayout());

    // set state
    this.state = {
      cyStyle: {
        height: window.innerHeight - 17 + 'px',
        width: window.innerWidth - 17 + 'px',
      },
    };
  }

  /*
   * @description Component lifecycle (called before component is mounted)
   * @method componentWillMount
   */
  componentWillMount(){
    // Add event listener on windows resize because the cy container needs "special" styling
    window.addEventListener("resize", () => this.updateDimensions(this.props));
  }

  /*
   * @description Component lifecycle (called after component is mounted)
   * @method componentDidMount
   */
  componentDidMount() {
    this.renderCytoscapeElement(this.props);
  }

  /*
   * @description Component lifecycle (called when receiving new props)
   * @method componentWillReceiveProps
   */
  componentWillUpdate(nextProps, nextState) {
    const {node} = nextProps;
    if (node !== this.props.node) {
      this.updateDimensions(nextProps);
    }

    this.renderCytoscapeElement(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    const {cyStyle: {width}} = prevState;

    if (width !== this.state.cyStyle.width) {
      this.renderCytoscapeElement(prevProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions(this.props));
  }

  updateDimensions(props) {
    const {node} = props;
    let height = window.innerHeight - 17 + 'px';
    let width = window.innerWidth - 17 + 'px';

    if (node) {
      height = window.innerHeight - 50 + 'px';
      width = window.innerWidth - 300 + 'px';
    }

    this.forceUpdate();
    this.setState({
      cyStyle: {
        height,
        width,
      },
    });
  }

  /*
   * @description Renders the graph
   * @method renderCytoscapeElement
   * @param {Object} props - Component props
   */
  renderCytoscapeElement(props){
    const {graph, layout} = props;
    if (layout.data) {

      this.cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: false,

        style: cytoscape.stylesheet()
          .selector('node')
          .css({
              'height': 80,
              'width': 80,
              'background-fit': 'cover',
              'border-color': '#000',
              'border-width': 3,
              'border-opacity': 0.5,
              'content': 'data(name)',
              'text-valign': 'center',
          })
          .selector('edge')
          .css({
              'width': 6,
              'target-arrow-shape': 'triangle',
              'line-color': '#ffaaaa',
              'target-arrow-color': '#ffaaaa',
              'curve-style': 'bezier',
              'content': 'data(name)'
          })
          .selector('.parent')
          .css({
            'shape': 'star'
          })
          .selector('.file')
          .css({
            'shape': 'roundrectangle'
          }),
        elements: graph,

        layout: layout.data[layout.current]
      });
    }
  }

  /*
   * @description Render method
   * @method render
   */
  render(){
    const {cyStyle} = this.state;

    return (
      <div className="graph-container">
        <div>
          <div style={cyStyle} id="cy"/>
        </div>
        <EditGraph />
      </div>
    );
  }
}

GraphContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  graph: PropTypes.object,
  layout: PropTypes.object,
};

export default connect((state) => {
  return {
    graph: state.graph.data,
    node: state.node.data,
    layout: state.layout,
  }
})(GraphContainer);