import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./components/index.component";
import Navbar from "./components/navbar.component"
import Cliente from "./components/cliente.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Index} />
      <Route path="/clientes" component={Cliente} />
      <Route path="/aseguradoras" component={Cliente} />
      <Route path="/bienes" component={Cliente} />
      <Route path="/categorias" component={Cliente} />
      </div>
    </Router>
  );
}

export default App;