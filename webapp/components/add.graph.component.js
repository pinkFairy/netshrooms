import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import {invalidateNode} from './../actions/node.actions';

class AddGraph extends Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.handleClose = this.handleClose.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  handleClose() {
    this.props.closeCb();
  }

  renderInput(field) {
    return (
      <div>
        <input {...field.input} type={field.type}  className="form-control" />
        {field.meta.touched &&
         field.meta.error &&
         <span className="error">{field.meta.error}</span>}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Add Graph
            </h4>
          </div>

          <div className="modal-body">
            <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label  className="col-sm-2 control-label">Enter the graph in json format</label>
                <div className="col-sm-10">
                  <Field
                    name="graph"
                    component={this.renderInput}
                    type="text"/>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-default">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
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
