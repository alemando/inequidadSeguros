

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./components/index.component";
import Headerbar from "./components/headerbar.component"
import LeftSidebar from './components/left-sidebar.component';
import Footer from './components/footer.component';
import Cliente from "./components/cliente.component";
import Aseguradora from "./components/aseguradora.component";
import Categoria from "./components/categoria.component";
import Seguro from "./components/seguro.component";
import Vendedor from "./components/vendedor.component";
/*
function App() {
  return (
    <Router>
    <div id="App">
      <SideBar />
      <div id="page-wrap">
        <header>
        <h1>Seguros Inequidad</h1>
        <h2 >compromiso y calidad </h2>
        </header>
        <hr width="80%"></hr>
        
      </div>
    </div>
    </Router>
  );
}

export default App;
*/
import React from 'react';

import './css/App.css';

export default function App() {
  return (
    <Router>
    <div id="App">
      <div id="main">
          <Headerbar></Headerbar>
          <LeftSidebar></LeftSidebar>
          <div className="content-page">
            <div className="content">
              <div className="container-fluid">
                  <Route path="/clientes" component={Cliente} />
                  <Route path="/vendedores" component={Vendedor} />
                  <Route path="/aseguradoras" component={Aseguradora} />
                  <Route path="/categorias" component={Categoria} />
                  <Route path="/seguros" component={Seguro} />
              </div>
            </div>
          </div>
          <Footer></Footer>
      </div>
    </div>
    </Router>

  );
}