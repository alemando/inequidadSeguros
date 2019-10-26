import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./components/index.component";
import Navbar from "./components/navbar.component"
import Cliente from "./components/cliente.component";
import Aseguradora from "./components/aseguradora.component";
import Bien from "./components/bien.component";
import Categoria from "./components/categoria.component";
<<<<<<< Updated upstream
=======
import Seguro from "./components/seguro.component";
import Vendedor from "./components/vendedor.component";
>>>>>>> Stashed changes

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
      <Route path="/bienes" component={Bien} />
      <Route path="/categorias" component={Categoria} />
<<<<<<< Updated upstream
=======
      {/*<Route path="/seguros" component={Seguros} />*/}

>>>>>>> Stashed changes
      </div>
    </Router>
  );
}

export default App;