import React, { Component } from 'react';
import {connect} from 'react-redux';

import NavBar from './navbar.component';

class Header extends Component {

  /*
   * @description Render method
   * @method render
   * @memberOf components.header
   */
  render() {
    const navItems = [
      {
        label: 'Drop-Down',
        isDropDown: true,
        dropDownList: [
          {
            label: 'Action',
            isDropDown: false,
          },
          {
            label: 'Another action',
            isDropDown: false,
          },
          {
            divider: true,
          },
          {
            label: 'Something else here',
            isDropDown: false,
          },
        ],
      },
      {
        label: 'Home',
        isDropDown: false,
      },
    ];

    return (
      <NavBar items={navItems} />
    );
  }
};

export default Header;
