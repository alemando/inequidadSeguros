import React, { Component } from 'react';
import CreateCriterio from "./create-criterio-categoria.component";
import VerCriterio from "./ver-criterio.component";
import EditCriterio from "./edit-criterio.component";
import $ from 'jquery';
import Swal from 'sweetalert2'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Criterio = props => (
  <Tr>
    <Td>{props.criterio.nombre}</Td>
    <Td><VerCriterio criterio={props.criterio} key={props.criterio.mombre} /></Td>
    <Td><EditCriterio component={props.component} criterio={props.criterio} key={props.criterio.nombre} /></Td>
    <Td><button type="button" onClick={() => props.component.removeCriterio(props.criterio.index)} className="btn btn-danger">X</button></Td>
  </Tr>
)

export default class CreateSeguro extends Component {

  constructor(){
    super();
    this.state = {
        vendedor: '',
        cliente: '',
        bien: '',
        aseguradora: '',
        fechaInicio: '',
        tipoPago: '',
        fechaFin: '',
        valorTotal: 0,
        diaPago: 1,
        observaciones: '',
        vendedores: [],
        aseguradoras: [],
        clientes: [],
        bienes: [],
        criterios: [],
        disabled : false
    }
    this.addSeguro = this.addSeguro.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.encontrarBien = this.encontrarBien.bind(this);
    this.addCriterio = this.addCriterio.bind(this);
    this.removeCriterio = this.removeCriterio.bind(this);
}

criteriosList() {
    let index = 0;
    return this.state.criterios.map(currentCriterio => {
        currentCriterio["index"] = index
        index++;
      return <Criterio component={this} criterio={currentCriterio} key={currentCriterio.nombre} />;
    })
  
}

addSeguro(e){
    e.preventDefault();

    let datos = {
      vendedor: this.state.vendedor._id,
        cliente: this.state.cliente,
        bien: this.state.bien,
        aseguradora: this.state.aseguradora,
        fechaInicio: this.state.fechaInicio,
        tipoPago: this.state.tipoPago,
        fechaFin: this.state.fechaFin,
        valorTotal: this.state.valorTotal,
        diaPago: this.state.diaPago,
        observaciones: this.state.observaciones,
        criterios: this.state.criterios
    }
    fetch('/api/seguros/save', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
          if(data.id == 0){

            Swal.fire({
              text: data.mensaje,
              type: 'error'
            })
          }else if(data.id == 1){

            this.props.component.fetchSeguros();

            Swal.fire({
              text: data.mensaje,
              type: 'success',
              onClose: () => {
                location.reload();
              }
            })

            $("#CrearSeguro").modal('hide');
            $("#formSeguro").reset();

            this.setState({
              vendedor: '',
              cliente: '',
              bien: '',
              aseguradora: '',
              fechaInicio: '',
              tipoPago: '',
              fechaFin: '',
              valorTotal: 0,
              diaPago: 1,
              observaciones: '',
              vendedor: null,
              aseguradoras: [],
              clientes: [],
              bienes: [],
              criterios: [],
              disabledFecha : false,
              disabledDiaPago : false
            });
          }else{
            Swal.fire({
              text: data.mensaje,
              type: 'error'
            })
          }

        })
        .catch(err => console.error(err));
}

vendedores(){
  return this.state.vendedores.map(currentVendedor => {
    return <option key={currentVendedor._id} value={currentVendedor._id}>{currentVendedor.nombre}</option>;
  })
}

  aseguradoras() {
    return this.state.aseguradoras.map(currentAseguradora => {
      return <option key={currentAseguradora._id} value={currentAseguradora._id}>{currentAseguradora.nombre}</option>;
    })
  }

  clientes() {
    return this.state.clientes.map(currentCliente => {
      return <option key={currentCliente._id} value={currentCliente._id}>{currentCliente.nombre + " CC " + currentCliente.documento}</option>;
    })
  }

  bienes() {
    return this.state.bienes.map(currentBien => {
      return <option key={currentBien._id} value={currentBien._id}>{currentBien.nombre}</option>;
    })
  }

  componentDidMount() {

    //Cargar lista vendedores
    fetch('/showSession', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ vendedor: data })
      })
      .catch(err => console.error(err));

    //Cargar lista aseguradoras habilitadas
    fetch('/api/aseguradoras/enabled', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ aseguradoras: data })
      })
      .catch(err => console.error(err));

      //Cargar lista clientes
      fetch('/api/clientes/habilitados', {
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ clientes: data })
      })
      .catch(err => console.error(err));
  }

  encontrarBien(id) {
    for (let i = 0; i < this.state.bienes.length; i++) {
      if (this.state.bienes[i]._id === id) {
        return this.state.bienes[i];
      }
    }
  }

  addCriterio(criterio) {
    this.setState({ criterios: [...this.state.criterios, criterio] })
  }

  removeCriterio(index) {
    this.setState(state => {
      const criterios = state.criterios.filter((item, j) => index !== j);
      return {
        criterios
      };
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    if (name == "cliente") {
      //Cargar lista bienes si selecciona el cliente
      if(value != ""){
        fetch('/api/bienes/' + value, {
          method: 'GET'
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ bienes: data })
          })
          .catch(err => console.error(err));
      }else{
        this.setState({bienes:[]});
      }
      
    }

    if (name == "bien") {
      let bien = this.encontrarBien(value)
      this.setState({ criterios: bien.categoria.criterios })
    }
  }

    handleOptionChange(changeEvent) {
      console.log(changeEvent.target.value);
      if(changeEvent.target.value == "Contado"){
        this.setState({
          disabledDiaPago: true
        });
        this.setState({
          disabledFecha: false
        });
      }else if (changeEvent.target.value == "Credito") {
        this.setState({
          disabledFecha: true
        });
        this.setState({
          disabledDiaPago: false
        });
        this.setState({
          fechaFin: ''
        })
        
      }
      this.setState({
        selectedOption: changeEvent.target.value,
        tipoPago: changeEvent.target.value
      });
    }

    render() {
      return (
      <div>
        <button type="button" className="btn btn-primary  float-right" data-toggle="modal" data-target="#CrearSeguro">Crear seguro</button>

      <div className="modal fade" id="CrearSeguro" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title"><b>Crear seguro</b></h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                      <form id="formSeguro" onSubmit={this.addSeguro}>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Vendedor:</label>
                              <label className="form-control">{this.state.vendedor.nombre}</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Aseguradora:</label>
                              <select name="aseguradora" onChange={this.handleChange}
                                  required
                                  value={this.state.aseguradora}
                                  className="form-control">
                                  <option  value=''>Seleccione...</option>
                                  {this.aseguradoras()}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Cliente:</label>
                              <select name="cliente" onChange={this.handleChange}
                                  required
                                  value={this.state.cliente}
                                  className="form-control">
                                  <option  value=''>Seleccione...</option>
                                  {this.clientes()}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Bien:</label>
                              <select name="bien" onChange={this.handleChange}
                                  required
                                  value={this.state.bien}
                                  className="form-control">
                                  <option  value=''>Seleccione...</option>
                                  {this.bienes()}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Fecha inicio:</label>
                              <input name="fechaInicio" onChange={this.handleChange} type="date"
                                  required
                                  value={this.state.fechaInicio}
                                  className="form-control"
                                  />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                            <label>* Tipo Pago:</label>
                            <form>
                              <div className="radio">
                                <label>
                                  <input type="radio" name="tipoPago" value="Contado" checked={this.state.selectedOption ==='Contado'} onChange={this.handleOptionChange} />
                                    Contado
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <input type="radio" name="tipoPago" value="Credito" checked={this.state.selectedOption === 'Credito'} onChange={this.handleOptionChange} />
                                  Credito
                                </label>
                              </div>
                          </form>
                          </div>
                        </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Fecha fin:</label>
                              <input name="fechaFin" onChange={this.handleChange} type="date"
                                  required
                                  value={this.state.fechaFin}
                                  className="form-control"
                                  disabled = {(this.state.disabledFecha)? "disabled" : ""}
                                  />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Dia pago:</label>
                              <input name="diaPago" onChange={this.handleChange} type="number" min="1" max="31"
                                  required
                                  value={this.state.diaPago}
                                  className="form-control"
                                  disabled = {(this.state.disabledDiaPago)? "disabled" : ""}
                                  />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>* Valor total:</label>
                              <input name="valorTotal" onChange={this.handleChange} type="number" min="0"
                                  required
                                  value={this.state.valorTotal}
                                  className="form-control"
                                  />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Observaciones:</label>
                              <textarea
                                className="md-textarea form-control"
                                name="observaciones"
                                onChange={this.handleChange}
                                value={this.state.observaciones}
                                rows="3">
                              </textarea>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Todos los campos con * son obligatorios</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                          <h2>* Criterios</h2>
                            <Table className="table">
                              <Thead className="thead-light">
                                <Tr>
                                  <Th>Nombre</Th>
                                  <Th>Ver mas</Th>
                                  <Th>Editar</Th>
                                  <Th>Borrar</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {this.criteriosList()}
                              </Tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                          <button type="submit" form="formSeguro" className="btn btn-primary">Enviar</button>
                          <CreateCriterio component={this} bien={this.state.bien} />
                          <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Cerrar</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      )
    }
}
