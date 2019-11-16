import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="left main-sidebar">
        <Link to="/" className="nav-link">Main</Link>
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
