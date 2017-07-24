import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import {addGraph} from './../actions/graph.actions';

class AddGraph extends Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(value) {
   const stringifiedValue = JSON.stringify(eval('('+value.graph+')'));
   const parsedValue = JSON.parse(stringifiedValue);

   this.props.dispatch(addGraph(parsedValue));
    this.props.closeCb();
  }

  handleClose() {
    this.props.closeCb();
  }

  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close">
              <span aria-hidden="true" onClick={this.handleClose}>&times;</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Add Graph
            </h4>
          </div>

          <div className="modal-body">
            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleFormSubmit)} >
              <div className="form-group">
                <label  className="col-sm-2 control-label">Enter the graph in json format</label>
                <div className="col-sm-10">
                  <Field
                    name="graph"
                    className="form-control"
                    component="textarea"
                    type="text"/>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={reset}>
                  Clear value
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

AddGraph.defaultProps = {
  closeCb: () => false,
};

AddGraph.propTypes = {
  closeCb: PropTypes.func,
};

export default reduxForm({
  form: 'graph'
})(AddGraph)
