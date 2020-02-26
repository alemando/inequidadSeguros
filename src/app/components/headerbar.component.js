// sidebar.js
import React, { Component } from 'react';
import EditContrasena from "./edit-contrasena.component"; 

export default class headerbar extends Component {
  constructor(props){
      super(props)
  }
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
                              <li className="float-right">
                                <span>{this.props.session.nombre}</span>
                                <button className="button-menu-mobile" title="Cambiar contraseña">
                                  <i className="fa fa-fw fa-key"></i>
                                  </button>
                                  <button className="button-menu-mobile" title="Cerrar sesion">
                                  <i className="fa fa-fw fa-sign-out"></i>
                                  </button>
                              </li> 
                                                
                          </ul>

              </nav>

        </div>
    );
  }
}

