/*
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./components/index.component";
import Navbar from "./components/navbar.component"
import Cliente from "./components/cliente.component";
import Aseguradora from "./components/aseguradora.component";
import Categoria from "./components/categoria.component";
import Seguro from "./components/seguro.component";
import Vendedor from "./components/vendedor.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Index} />
      <Route path="/clientes" component={Cliente} />
      <Route path="/vendedores" component={Vendedor} />
      <Route path="/aseguradoras" component={Aseguradora} />
      <Route path="/categorias" component={Categoria} />
      <Route path="/seguros" component={Seguro} />
      </div>
    </Router>
  );
}

export default App;
*/
import React from 'react';
import SideBar from "./components/sidebar.component";

import './css/App.css';

export default function App() {
  return (
    <div id="App">
      <SideBar />
      <div id="page-wrap">
        <h1>Requisistemas</h1>
        <h2 >La buena caravana </h2>
      </div>
    </div>
  );
}