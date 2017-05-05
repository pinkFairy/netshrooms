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
          />
        );
      } else {
        return (
          <li class="nav-item">
            <a class="nav-link active" href="#">{item.label}</a>
          </li>
        );

      }

    })
  }

  render() {
    return (
      <ul className="nav nav-pills">
        {this.renderNavItems()}
      </ul>
    );
  }
};

NavBar.propTypes = {
  items: PropTypes.array,
}

export default NavBar;
