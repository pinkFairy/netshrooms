import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class DropDownNavItem extends Component {
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
      'nav-item dropdown': true,
//      'btn-group': true,
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

    return items.map((item) => {
      if (item.divider) {
        return (<li role="separator" className="divider"></li>);
      }

//      if (item.isDropdown) {
//        return (<DropDownNavItem
//            items={item.dropDownList}
//            label={item.label}>);
//      }

      return (<li><a href="#">${item.label}</a></li>);
    })
  }

  render() {
    const {
      label
    } = this.props;

    return (
      <li className={this.getDropDownClassName()}
          onClick={this.toggleDropDown}>
        <a className="nav-link dropdown-toggle">
          {label} <span className="caret"></span>
        </a>
//        <div className="dropdown-menu">
//          <a className="dropdown-item" href="#">Action</a>
//          <a className="dropdown-item" href="#">Another action</a>
//          <a className="dropdown-item" href="#">Something else here</a>
//          <div className="dropdown-divider"></div>
//          <a className="dropdown-item" href="#">Separated link</a>
//        </div>

        <ul className="dropdown-menu">
          {this.renderDropDownList()}
        </ul>
      </li>

//      <div className={this.getDropDownClassName()}
//           onClick={this.toggleDropDown}>
//        <button className="btn btn-default btn-lg dropdown-toggle">
//          ${label} <span className="caret"></span>
//        </button>
//        <ul className="dropdown-menu">
//          {this.renderDropDownList()}
//        </ul>
//      </div>
    );
  }
};

DropDownNavItem.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
}

export default DropDownNavItem;
