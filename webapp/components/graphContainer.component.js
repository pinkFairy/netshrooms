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

    // get dependecies
    this.props.dispatch(getGraph());
    this.props.dispatch(getDefaultLayout());
  }

  /*
   * @description Component lifecycle (called after component is mounted)
   * @method componentDidMount
   */
  componentDidMount(){
    this.renderCytoscapeElement(this.props);
  }

  /*
   * @description Component lifecycle (called when receiving new props)
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    this.renderCytoscapeElement(nextProps);
  }

  /*
   * @description Renders the graph
   * @method renderCytoscapeElement
   * @param {Object} props - Component props
   */
  renderCytoscapeElement(props){
    const {graph, layout} = props;
    if (graph && layout.data) {

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
    let cyStyle = {
      height: document.body.clientHeight - 50 + 'px',
      width: document.body.clientWidth - 300 + 'px',
    };

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
    layout: state.layout,
  }
})(GraphContainer);