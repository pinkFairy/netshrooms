import React,{Component} from 'react';
import cytoscape from 'cytoscape';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {getGraph} from './../actions/graph.actions';

class GraphContainer extends React.Component{
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);

    // get dependecies
    this.props.dispatch(getGraph());
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
    const {graph} = props;
    if (graph) {
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

        layout: {
          name: 'breadthfirst',
          directed: true,
          padding: 10
        }
      });
    }
  }

  /*
   * @description Render method
   * @method render
   */
  render(){
    let cyStyle = {
      height: '1000px',
      width: '1000px',
      margin: '20px 0px'
    };

    return (
      <div>
        <div style={cyStyle} id="cy"/>
      </div>
    );
  }
}

GraphContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  graph: PropTypes.object
};

export default connect((state) => {
  return {
    graph: state.graph.data
  }
})(GraphContainer);