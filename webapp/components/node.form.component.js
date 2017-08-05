import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Fields, Field, FieldArray, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

// actions
import {invalidateNode} from './../actions/node.actions';

// constants
import {
   BOOLEAN,
   FILE,
   NUMBER,
   OBJECT,
   STRING,
 } from './../utils/constants/app.constants';
import {
  OPERATION_NODE,
  PARENT_NODE,
  SIMPLE_NODE,
} from './../utils/constants/node.constants';

class NodeForm extends Component {
  constructor(props){
    super(props);
    // bind the functions to the current instance
    this.handleClose = this.handleClose.bind(this);
    this.renderNodeSpecificFields = this.renderNodeSpecificFields.bind(this);
  }

  handleClose() {
    const {
      dispatch,
      reset,
    } = this.props;

    reset();
    dispatch(invalidateNode());
  }

  renderSimpleNode() {
    return (
      <div>
        <div className="form-group">
          <label>Select type</label>
          <Field className="form-control" name={'type'} component="select">
            <option value={STRING}>{STRING}</option>
            <option value={NUMBER}>{NUMBER}</option>
            <option value={BOOLEAN}>{BOOLEAN}</option>
            <option value={OBJECT}>{OBJECT}</option>
            <option disabled value={FILE}>{FILE}</option>
          </Field>
        </div>
        <div className="form-group">
          <label>Value</label>
          <Field className="form-control" name="value" component="input" type="text" value=""/>
        </div>
      </div>
    );
  }

  renderOperationNode() {
    return (
      <div>
        <FieldArray name="inputsGroup" component={this.renderInputFields} />
        <FieldArray name="outputsGroup" component={this.renderOutputFields} />
      </div>
    );
  }

  renderInputFields({ fields, meta: { error, submitFailed } }) {
    return (
      <div>
        <button type="button" onClick={() => fields.push({})}>
          Add Input
        </button>
        {fields.map((input, index) =>
          <div className="form-group" key={index}>
            <span className="glyphicon glyphicon-remove pull-right" onClick={() => fields.remove(index)}/>
            <label>Input #{index + 1}</label>
            <Field className="form-control" name={`${input}.input`} component="select">
              <option value={STRING}>{STRING}</option>
              <option value={NUMBER}>{NUMBER}</option>
              <option value={BOOLEAN}>{BOOLEAN}</option>
              <option value={OBJECT}>{OBJECT}</option>
              <option disabled value={FILE}>{FILE}</option>
            </Field>
          </div>
        )}
      </div>
    );
  }

  renderOutputFields({ fields, meta: { error, submitFailed } }) {
    return (
      <div>
        <button type="button" onClick={() => fields.push({})}>
          Add Output
        </button>
        {fields.map((output, index) =>
          <div className="form-group" key={index}>
            <span className="glyphicon glyphicon-remove pull-right" onClick={() => fields.remove(index)}/>
            <label>Output #{index + 1}</label>
            <Field className="form-control" name={`${output}.output`} component="select">
              <option value={STRING}>{STRING}</option>
              <option value={NUMBER}>{NUMBER}</option>
              <option value={BOOLEAN}>{BOOLEAN}</option>
              <option value={OBJECT}>{OBJECT}</option>
              <option disabled value={FILE}>{FILE}</option>
            </Field>
          </div>
        )}
      </div>
    );
  }

  renderNodeSpecificFields(fields) {
    const {nodeType: {input}} = fields;
    let content = false;

    switch(input.value) {
      case SIMPLE_NODE:
        content = this.renderSimpleNode();
        break;
      case OPERATION_NODE:
        content = this.renderOperationNode();
        break;
      case PARENT_NODE:
        content = false;
        break;
    }

    return content;
  }

  render() {
    const {node, handleSubmit, reset} = this.props;

    return (
      <div className="edit-graph jumbotron">
        <span className="glyphicon glyphicon-remove pull-right" onClick={this.handleClose}/>
        <h4>Add Node</h4>

        <form className="form-lateral" role="form" onSubmit={handleSubmit} >
          <div className="form-group">
            <label>Name</label>
            <Field className="form-control" name="name" component="input" type="text" value=""/>
          </div>

          <div className="form-group">
            <label>Select node type</label>
            <div className="form-radio-box">
              <label><Field name="nodeType" component="input" type="radio" value={SIMPLE_NODE}/> Simple</label>
              <label><Field name="nodeType" component="input" type="radio" value={OPERATION_NODE}/> Operation</label>
              <label><Field name="nodeType" disabled component="input" type="radio" value={PARENT_NODE}/> Parent</label>
            </div>
          </div>

          <Fields names={['nodeType']} component={this.renderNodeSpecificFields}/>

          <div>
            <button type="button" className="btn btn-default" onClick={reset}>
              Clear value
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    );
  }
};

NodeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  values: PropTypes.string,
};

NodeForm = reduxForm({
  form: 'nodeForm'
})(NodeForm);

export default connect(state => ({
  node: state.node.data,
}))(NodeForm);
