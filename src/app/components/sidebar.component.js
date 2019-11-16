

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
       <font color="#2ebf91"> <b><h2>Menú principal</h2></b></font>
      </a>

      <a className="menu-item" href="/seguros">
      <font color="#2ebf91"><b><h3>Seguros </h3></b></font>
      </a>

      <a className="menu-item" href="/categorias">
      <font color="#2ebf91"><b><h3>Categorías</h3></b></font>
      </a>

      <a className="menu-item" href="/clientes">
      <font color="#2ebf91"><b><h3>Clientes</h3></b></font>
      </a>

      <a className="menu-item" href="/vendedores">
      <font color="#2ebf91"><b><h3>Vendedores</h3></b></font>
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

