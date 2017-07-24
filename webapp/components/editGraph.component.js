import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {invalidateNode} from './../actions/node.actions';

class EditGraph extends Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.dispatch(invalidateNode());
  }

  render() {
    const {node} = this.props;

    if (node) {
      return (
        <div className="edit-graph jumbotron">
          <span className="glyphicon glyphicon-remove pull-right" onClick={this.handleClose}/>
          Add/Edit
        </div>
      );
    }

    return false;
  }
};

EditGraph.propTypes = {
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
};

export default connect((state) => {
  return {
    node: state.node.data,
  }
})(EditGraph);
