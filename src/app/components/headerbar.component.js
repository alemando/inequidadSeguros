// sidebar.js
import React, { Component } from 'react';



export default class headerbar extends Component {

  closeSession(){
    fetch('/closeSession')
        .then(res => res.json())
        .then(data => {
          location.reload();
        })
        .catch(err => console.error(err));
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
                                <span className="text-white">{this.props.session.nombre}</span>

                                  <button className="button-menu-mobile" title="Cambiar contraseña" data-toggle="modal"  data-target='#EditarContrasena'>
                                  <i className="fa fa-fw fa-key"></i>
                                  </button>
                                  <button className="button-menu-mobile" title="Cerrar sesion" onClick={this.closeSession}>
                                  <i className="fa fa-fw fa-sign-out"></i>
                                  </button>
                              </li> 
                                                
                          </ul>

              </nav>

        </div>
    );
  }
}