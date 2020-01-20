import React, { Component } from 'react';
import VerCriterio from "./ver-criterio-seguro.component";

const Criterio = props => (
  <tr>
    <td>{props.criterio.nombre}</td>
    <td><VerCriterio criterio={props.criterio} key={props.criterio._id}/></td>
  </tr>
)

export default class VerSeguro extends Component {

  constructor() {
    super();

    this.state = {
      criterios: []
    }
  }

  componentDidMount(){
    this.setState({criterios : this.props.seguro.criterios})
  }

  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <Criterio criterio={currentCriterio} key={currentCriterio._id} />;
    })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Seguro" + this.props.seguro._id}>ver más</button>
        <div className="modal fade" id={"Seguro" + this.props.seguro._id} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Seguro</b></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Vendedor</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.vendedor.nombre+
                    " "+this.props.seguro.vendedor.apellido1+" "+this.props.seguro.vendedor.apellido2}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Aseguradora</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.aseguradora.nombre}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Cliente</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.cliente.nombre+
                    " "+this.props.seguro.cliente.apellido1+" "+this.props.seguro.cliente.apellido2}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Bien</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.bien.nombre}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Tipo de pago</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.tipoPago}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Fecha Inicio</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.fechaInicio}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Fecha Fin</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.fechaFin}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Dia pago</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.diaPago}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Valor total</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.valorTotal}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Estado</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.estado}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Observaciones</b></div>
                    <div className="col-md-6 ml-auto">{this.props.seguro.observaciones}</div>
                  </div>
                  <div className="row">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Ver más</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.criteriosList()}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
