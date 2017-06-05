import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class DropDownNavItem extends Component {
  constructor(props){
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = {
      dropDownVisible: false
    }
  }

  getDropDownClassName() {
    const {dropDownVisible} = this.state;

    return classNames({
      'nav-item dropdown': true,
      'open': dropDownVisible
     });
  }

  toggleDropDown() {
    this.setState({
      dropDownVisible: !this.state.dropDownVisible
    })
  }

  renderDropDownList(items) {

    return items.map((item) => {
      if (item.divider) {
        return (<li role="separator" className="divider"  key={item.key}></li>);
      }

      if (item.isDropDown) {
        return (
          <li className="dropdown-submenu" key={item.label} title={item.title}>
            <a tabIndex="-1" href="#">{item.label}</a>
            <ul className="dropdown-menu">
              {this.renderDropDownList(item.dropDownList)}
            </ul>
          </li>
        );
      }

      if (item.clickHandler) {
        return (<li key={item.label} title={item.title} onClick={item.clickHandler}><a href="#">{item.label}</a></li>);
      }

      return (<li key={item.label} title={item.title}><a href="#">{item.label}</a></li>);
    })
  }

  render() {
    const {
      label,
      items
    } = this.props;

    return (
      <li className={this.getDropDownClassName()}
          onClick={this.toggleDropDown}
          key={label}>
        <a className="nav-link dropdown-toggle">
          {label} <span className="caret"></span>
        </a>
        <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
          {this.renderDropDownList(items)}
        </ul>
      </li>
    );
  }
};

DropDownNavItem.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
}

export default DropDownNavItem;
