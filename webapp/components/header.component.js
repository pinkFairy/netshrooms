import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// actions
import {addGraph} from './../actions/graph.actions';
import {changeLayout} from './../actions/layout.actions';
import {addNode} from './../actions/node.actions';
// components
import NavBar from './navbar.component';
import AddGraph from './add.graph.component';
// constants
import {
  NO_LAYOUT,
  RANDOM_LAYOUT,
  PRESET_LAYOUT,
  GRID_LAYOUT,
  CIRCLE_LAYOUT,
  CONCENTRIC_LAYOUT,
  BREADTHFIRST_LAYOUT,
  COSE_LAYOUT,
} from './../utils/constants/layout.constants';


class Header extends Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    // initialise navItems
    this.navItems = [
      {
        label: 'Add',
        isDropDown: true,
        dropDownList: [
          {
            label: 'Graph',
            isDropDown: false,
            title: 'Add a new node.',
            clickHandler: () => this.handleAddGraph(),
          },
          {
            label: 'NODE',
            isDropDown: false,
            title: 'Add a new node.',
            clickHandler: () => this.handleAddNode(),
          },
          {
            label: 'EDGE',
            isDropDown: false,
            title: 'Add a new edge.',
            clickHandler: () => this.handleLayoutChange(RANDOM_LAYOUT),
          },
        ]
      },
      {
        label: 'Layout',
        isDropDown: true,
        dropDownList: [
          {
            label: 'Random',
            isDropDown: false,
            title: 'The random layout puts nodes in random positions within the viewport.',
            clickHandler: () => this.handleLayoutChange(RANDOM_LAYOUT),
          },
          {
            label: 'Preset',
            isDropDown: false,
            title: 'The preset layout puts nodes in the positions you specify manually.',
            clickHandler: () => this.handleLayoutChange(PRESET_LAYOUT),
          },
          {
            label: 'Grid',
            isDropDown: false,
            title: 'The grid layout puts nodes in a well-spaced grid.',
            clickHandler: () => this.handleLayoutChange(GRID_LAYOUT),
          },
          {
            label: 'Circle',
            isDropDown: false,
            title: 'The circle layout puts nodes in a circle.',
            clickHandler: () => this.handleLayoutChange(CIRCLE_LAYOUT),
          },
          {
            label: 'Concentric',
            isDropDown: false,
            title: 'The concentric layout positions nodes in concentric circles, based on a metric that you specify to segregate the nodes into levels.',
            clickHandler: () => this.handleLayoutChange(CONCENTRIC_LAYOUT),
          },
          {
            label: 'Breadthfirst',
            isDropDown: false,
            title: 'The breadthfirst layout puts nodes in a hierarchy, based on a breadthfirst traversal of the graph.',
            clickHandler: () => this.handleLayoutChange(BREADTHFIRST_LAYOUT),
          },
          {
            label: 'Cose',
            isDropDown: false,
            title: 'The cose (Compound Spring Embedder) layout uses a physics simulation to lay out graphs.',
            clickHandler: () => this.handleLayoutChange(COSE_LAYOUT),
          }
        ]
      },
      {
        label: 'Something else here',
        isDropDown: false,
      },
      {
        label: 'Home',
        isDropDown: false,
      },
    ];
  }

  handleLayoutChange(selectedLayout) {
    this.props.dispatch(changeLayout(selectedLayout));
  }

  handleAddNode() {
    this.props.dispatch(addNode());
  }

  handleAddGraph() {
    this.props.dispatch(addGraph());
  }

  /*
   * @description Render method
   * @method render
   * @memberOf components.header
   */
  render() {
    return (
      <div className="header-conatiner">
        <NavBar items={this.navItems} />
      </div>
    );
  }
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Header);
