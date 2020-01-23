// sidebar.js
import React, { Component } from 'react';

export default class headerbar extends Component {
  render(){
    return (
      <div className="headerbar">

              <div className="headerbar-left">
            <a href="/index" className="logo"><img alt="logo" src="assets/images/logo.png" /> <span>Seguros</span></a>
              </div>

              <nav className="navbar-custom">

                          <ul className="list-inline menu-left mb-0">
                              <li className="float-left">
                                  <button className="button-menu-mobile open-left">
                      <i className="fa fa-fw fa-bars"></i>
                                  </button>
                              </li>                        
                          </ul>

              </nav>

        </div>
    );
  }
}

