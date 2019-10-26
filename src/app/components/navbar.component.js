import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Seguros</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/clientes" className="nav-link">Clientes</Link>
          </li>
          <li className="navbar-item">
          <Link to="/aseguradoras" className="nav-link">Aseguradoras</Link>
          </li>
          <li className="navbar-item">
          <Link to="/bienes" className="nav-link">Bienes</Link>
          </li>
          <li className="navbar-item">
          <Link to="/categorias" className="nav-link">Categorias</Link>
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