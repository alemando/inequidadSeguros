import React, { Component } from 'react';
import VerCriterio from "./ver-criterio-seguro.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import moment from 'moment'
import Swal from 'sweetalert2'

const Criterio = props => (
  <Tr>
    <Td>{props.criterio.nombre}</Td>
    <Td><center><VerCriterio criterio={props.criterio} key={props.criterio._id} /></center></Td>
  </Tr>
)

export default class VerSeguro extends Component {

  constructor(props) {
    super(props);

    this.state = {
      criterios: [],
      estado: '',
      _id : props.seguro._id,
      tipoPago: props.seguro.tipoPago,
      fechaInicio: props.seguro.fechaInicio,
      fechaFin: props.seguro.fechaFin,
      diaPago: props.seguro.diaPago,
      valorTotal: props.seguro.valorTotal,
      observaciones: props.seguro.observaciones
    }
    this.editSeguro = this.editSeguro.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.eliminarSeguro = this.eliminarSeguro.bind(this);

  }

  editSeguro(e) {
    e.preventDefault();
    fetch('/api/seguros/editar', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.id == 0) {

          Swal.fire({
            text: data.mensaje,
            type: 'error'
          })
        } else if (data.id == 1) {

          Swal.fire({
            text: data.mensaje,
            type: 'success',
            onClose: () => {
              location.reload();
            }
          })

          $('EditarSeguro-' + this.props.seguro.vendedor).modal('hide');
          $('formEditarSeguro-' + this.props.seguro.vendedor).reset();

          this.setState({
            vendedor: '',
            aseguradora: '',
            cliente: '',
            Bien: '',
            tipoPago: '',
            fechaInicio: '',
            diaPago: 0,
            valorTotal: 0,
            estado: '',
          });
        } else {
          Swal.fire({
            text: data.mensaje,
            type: 'error'
          })
        }
      })
      .catch(err => console.error(err));
  }
  componentDidMount() {
    this.setState({
      criterios: this.props.seguro.criterios,
      estado: this.props.seguro.estado,
      id: this.props.seguro._id
    })
  }

  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <Criterio criterio={currentCriterio} key={currentCriterio._id} />;
    })
  }
  confirmDialog() {
    Swal.fire({
      title: 'Estas seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c70a',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        fetch('/api/seguros/finiquitar/' + this.state.id, {
          method: 'POST',
          body: JSON.stringify({ estado: this.state.estado }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.id == 0) {

              Swal.fire({
                text: data.mensaje,
                type: 'error'
              })
            } else if (data.id == 1) {

              Swal.fire({
                text: data.mensaje,
                type: 'success',
                onClose: () => {
                  location.reload();
                }
              })
            } else {
              Swal.fire({
                text: data.mensaje,
                type: 'error'
              })

            }
          })
          .catch(err => console.error(err));
      }
    })
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    console.log(this.state)
  }

  eliminarSeguro(e) {
    fetch('/api/seguros/remove/' + this.props.seguro._id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      if(data.id == 0){

        Swal.fire({
          text: data.mensaje,
          type: 'error'
        })
      }else if(data.id == 1){
        Swal.fire({
          text: data.mensaje,
          type: 'success',
          onClose: () => {
            location.reload(false);
          }
        })
      } else {
          Swal.fire({
              text: data.mensaje,
              type: 'error'
          })
      }
    })
    .catch(err => console.log(err));
    $("#Seguro" + this.props.seguro._id).modal('close');
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Seguro" + this.props.seguro._id}>Ver más</button>
        <div className="modal fade" id={"Seguro" + this.props.seguro._id} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Seguro</b> {this.props.seguro.bien.nombre + " de " + this.props.seguro.cliente.nombre + " " + this.props.seguro.cliente.apellido1 + " " + this.props.seguro.cliente.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <div className="container">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha de creación</b></div>
                        <div className="col-md-6 ml-auto">{moment(this.props.seguro.fechaCreacion, "YYYY-MM-DD").locale("es").format("DD-MMM-YYYY")}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Vendedor</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.vendedor.nombre +
                          " " + this.props.seguro.vendedor.apellido1 + " " + this.props.seguro.vendedor.apellido2}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Aseguradora</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.aseguradora.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Cliente</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.cliente.nombre +
                          " " + this.props.seguro.cliente.apellido1 + " " + this.props.seguro.cliente.apellido2}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Bien</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.bien.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Tipo de pago</b></div>
                         <div className="col-md-6 ml-auto">{this.props.seguro.tipoPago}</div>

                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha Inicio</b></div>
                         <div className="col-md-6 ml-auto">{moment(this.props.seguro.fechaInicio, "YYYY-MM-DD").locale("es").format("DD-MMM-YYYY")}</div>
                      </div>
                    </li>
                    {moment(this.props.seguro.fechaFin, "YYYY-MM-DD").isValid() &&
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha Fin</b></div>
                        <div className="col-md-6 ml-auto">{moment(this.props.seguro.fechaFin, "YYYY-MM-DD").locale("es").format("DD-MMM-YYYY")}</div>
                      </div>
                    </li>
                    }
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Dia pago</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="diaPago" onChange={this.handleChange} type="number"
                          required
                          value={this.state.diaPago}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.seguro.diaPago}</div>)}
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Valor total</b></div>
                         <div className="col-md-6 ml-auto">{this.props.seguro.valorTotal}</div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="row">

                        <div className="col-md-6 ml-auto"><b>Estado</b></div>
                        <div className="col-md-6 ml-auto">
                          <div className="form-group">
                            {((this.props.seguro.estado != "En proceso" || !this.props.session.esAdmin) ? <div>{this.props.seguro.estado }</div> : <select name="estado"
                              onChange = {this.handleChange}
                              required
                              value={this.state.estado}
                              className="form-control">
                              <option value=''>Seleccione...</option>
                              <option value={true}>Aprobado</option>
                              <option value={false}>Rechazado</option>
                            </select>)}

                          </div>

                        </div>
                      </div>
                      {((this.props.seguro.estado != "En proceso" || !this.props.session.esAdmin) ? "" : <button type="submit" className="btn btn-primary" onClick={this.confirmDialog}>Confirmar</button>)}

                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Observaciones</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="Observaciones" onChange={this.handleChange} type="text"
                          required
                          value={this.state.Observaciones}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.seguro.Observaciones}</div>)}
                      </div>
                    </li>
                  </ul>
                  <div className="row">
                    <Table className="table">
                      <Thead className="thead-light">
                        <Tr>
                          <Th>Nombre</Th>
                          <Th>Ver más</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {this.criteriosList()}
                      </Tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">

              {(this.state.editMode ? <button type="button" className="btn btn-success" onClick={this.editSeguro}>Enviar</button>
                : "")}
              {(this.state.editMode ? <button type="button" className="btn btn-danger" onClick={() => this.setState({ editMode: false })}>Cancelar</button>
                  : <button type="button" className="btn btn-warning" onClick={() => this.setState({ editMode: true })}>Editar</button>)}
                  <button type="button" className="btn btn-danger" onClick={this.eliminarSeguro} >Eliminar seguro</button>

                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
