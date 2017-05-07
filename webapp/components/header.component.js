import React, { Component } from 'react';
import {connect} from 'react-redux';

import NavBar from './navbar.component';

class Header extends Component {
  constructor(props){
    super(props);
    // initialise navItems
    this.navItems = [
      {
        label: 'Drop-Down',
        isDropDown: true,
        dropDownList: [
          {
            label: 'Action',
            isDropDown: true,
            dropDownList: [
              {
                label: 'WHAAAAT?',
                isDropDown: false,
              }
            ]
          },
          {
            label: 'Another action',
            isDropDown: false,
          },
          {
            key: 'divider',
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
  }


  /*
   * @description Render method
   * @method render
   * @memberOf components.header
   */
  render() {
    return (
      <NavBar items={this.navItems} />
    );
  }
};

export default Header;
