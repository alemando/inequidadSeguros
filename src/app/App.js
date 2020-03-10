//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//MomentJS
import "moment/moment.js"

//Fontawesome
import "@fortawesome/fontawesome-free/css/fontawesome.min.css"

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
import React from 'react';
import EditContrasena from "./components/edit-contrasena.component"; 


export default function App(props) {
  return (
    <Router>
    <div id="App">
     <EditContrasena/>
      <div id="main">
          <Headerbar session={props.session}/>
          <LeftSidebar/>
          <div className="content-page">
            <div className="content">
              <div className="container-fluid">
                  <Route path="/clientes" component={()=><Cliente session={props.session}/>} />
                  <Route path="/vendedores" component={()=><Vendedor session={props.session}/>} />
                  <Route path="/aseguradoras" component={()=><Aseguradora session={props.session}/>} />
                  <Route path="/categorias" component={()=><Categoria session={props.session}/>} />
                  <Route path="/seguros" component={()=><Seguro session={props.session}/>} />
              </div>
              <div>
              <center><h3><p>Acá voy a hacer el cuadrito para mostrar la</p>
                  <p>CANTIDAD </p>
                  <p>de clientes creados entre ciertas fechas.</p>
              </h3>
              <label for="start">Fecha Inicio:</label>
              <input type="date" id="start" name="trip-start"
                    
                    min="2015-01-01" max="2030-12-31"></input>
              <label for="start">Fecha Final</label>
              <input type="date" id="start" name="trip-start"
                    
                    min="2015-01-01" max="2030-12-31"></input>      
            </center>
            </div>
            </div>
          </div>
          <Footer></Footer>
      </div>
    </div>
    </Router>

  );
}