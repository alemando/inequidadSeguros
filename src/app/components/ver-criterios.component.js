import React, { Component } from 'react';
import VerCriterio from "./ver-criterio.component";

const Criterio = props => (
  <tr>
    <td>{props.criterio.nombre}</td>
    <td><VerCriterio criterio={props.criterio} key={props.criterio.mombre}/></td>
  </tr>
)

export default class VerCriterios extends Component {
  
  constructor() {
    super();

    this.state = {
      criterios: []
    }
  }

  componentDidMount(){
    this.setState({criterios : this.props.categoria.criterios})
  }

  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <Criterio criterio={currentCriterio} key={currentCriterio.nombre} />;
    })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Criterios-" + this.props.categoria.nombre}>ver bienes</button>
        <div className="modal fade" id={"Criterios-" +this.props.categoria.nombre} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Criterios</b></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
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