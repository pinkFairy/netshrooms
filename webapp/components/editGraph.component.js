import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class EditGraph extends Component {

  render() {
    return (
      <div className="edit-graph jumbotron">
        Add/Edit
      </div>
    );
  }
};

EditGraph.propTypes = {
  items: PropTypes.array,
}

export default EditGraph;
