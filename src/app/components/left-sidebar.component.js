import React, { Component } from 'react';

export default class LeftSidebar extends Component {
  render(){
    return (
      <div className="left main-sidebar">
    
              <div className="sidebar-inner leftscroll">

                  <div id="sidebar-menu">
              
                  <ul>
                          <li className="submenu">
                              <a href="/"><i className="fa fa-fw fa-home"></i><span> Pagina principal </span> </a>
                          </li>
                                              
                          <li className="submenu">
                              <a href="/seguros"><i className="fa fa-shield"></i><span> Seguros </span> </a>
                          </li>

                          <li className="submenu">
                              <a href="/categorias"><i className="fa fa-archive"></i><span> Categorías </span> </a>
                          </li>

                          <li className="submenu">
                              <a href="/aseguradoras"><i className="fa fa-handshake-o"></i><span> Aseguradoras </span> </a>
                          </li>

                          <li className="submenu">
                              <a href="/clientes"><i className="fa fa-users"></i><span> Clientes </span> </a>
                          </li>

                          <li className="submenu">
                              <a href="/vendedores"><i className="fa fa-id-card-o"></i><span> Vendedores </span> </a>
                          </li>
                          
                  </ul>

                  <div className="clearfix"></div>

                  </div>
              
                  <div className="clearfix"></div>

              </div>

          </div>  
    );
  }
}


