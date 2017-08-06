import React,{Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import {getDefaultLayout} from './../actions/layout.actions';

// services
import cyService from './../services/cy.service';

// components
import NodeForm from './node.form.component';

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
      this.cy = cyService.get(graph, layout.data[layout.current]);
    }

    if (this.cy) {
       this.cy.on('tap', 'node', function (evt) {
           console.log('evt', evt);
           console.log('evt.cyTarget', evt.target);
           console.log('evt.cyTarget', evt.target['_private'].data.id);
           console.log('evt.cyTarget 3x', evt.target.id());
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
        <NodeForm />
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