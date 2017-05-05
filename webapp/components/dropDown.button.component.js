import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

class DropDownButton extends Component {
  constructor(props){
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = {
      dropDownVisible: true
    }
  }

  getDropDownClassName() {
    const {dropDownVisible} = this.state;

    return classNames({
//      'nav-item dropdown': true,
      'btn-group': true,
      'open': !dropDownVisible
     });
  }

  toggleDropDown() {
    this.setState({
      dropDownVisible: !this.state.dropDownVisible
    })
  }

  renderDropDownList() {
    const {items} = this.props;

    items.map((item) => {
      if (item.divider) {
        return (<li role="separator" className="divider"></li>);
      }

      if (item.isDropdown) {
        return ();
      }

      return (<li><a href="#">${item.label}</a></li>);
    })
  }

  render() {
    const {
      label
    } = this.props;

    return (
      <div className={this.getDropDownClassName()}
           onClick={this.toggleDropDown}>
        <button className="btn btn-default btn-lg dropdown-toggle">
          ${label} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {this.renderDropDownList()}
        </ul>
      </div>
    );
  }
};

DropDownButton.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
}

export default DropDownButton;
