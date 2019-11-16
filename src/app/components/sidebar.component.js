

// sidebar.js

import { Link } from 'react-router-dom';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import MediaQuery from 'react-responsive' 

export default props => {
  return (
    <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
    <Menu>
    

    <a className="menu-item" href="/index">
      <p> <font color="#1565C0"> <b><h2><i className="fa fa-fw fa-home"></i> Menú </h2></b></font></p>
      </a>

      <a className="menu-item" href="/seguros">
      <p><font color="#1565C0"><b><h3><i className="fa fa-shield"></i> Seguros </h3></b></font></p>
      </a>

      <a className="menu-item" href="/categorias">
      <p><font color="#1565C0"><b><h3><i className="fa fa-archive"></i> Categorías</h3></b></font></p>
      </a>

      <a className="menu-item" href="/clientes">
      <p><font color="#1565C0"><b><h3><i className="fa fa-users"></i> Clientes</h3></b></font></p>
      </a>

      <a className="menu-item" href="/vendedores">
      <p><font color="#1565C0"><b><h3><i className="fa fa-id-card-o"></i> Vendedores</h3></b></font></p>
      </a>

      
    </Menu>
    </MediaQuery>    
  );
};
/*
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">Main</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/clientes" className="nav-link">Clientes</Link>
          </li>
          <li className="navbar-item">
          <Link to="/aseguradoras" className="nav-link">Aseguradoras</Link>
          </li>
          <li className="navbar-item">
          <Link to="/categorias" className="nav-link">Categorias</Link>
          </li>
          <li className="navbar-item">
          <Link to="/seguros" className="nav-link">Seguros</Link>
          </li>
          <li className="navbar-item">
          <Link to="/vendedores" className="nav-link">Vendedores</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
*/

