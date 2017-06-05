import React, { Component } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DropDownNavItem from './dropDown.navItem.component';

class NavBar extends Component {

  renderNavItems() {
    const {items} = this.props;

    return items.map((item) => {
      if (item.isDropDown) {
        return (
          <DropDownNavItem
            items={item.dropDownList}
            label={item.label}
            key={item.label}
          />
        );
      } else {
        return (
          <li className="nav-item" key={item.label}>
            <a className="nav-link active" href="#">{item.label}</a>
          </li>
        );
      }
    })
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {this.renderNavItems()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

NavBar.propTypes = {
  items: PropTypes.array,
}

export default NavBar;
