import React, { Component } from 'react';
import Modal from 'react-modal';
const Categoria = props => (
  <tr>
    <td>{props.categoria.nombre}</td>
    <td><Criterio categoria={props.categoria.nombre} key={props.categoria.nombre}></Criterio></td>
  </tr>
)
const MostrarCriterio = props => (
  <tr>
    <td>{props.criterio.nombre}</td>
    <td>{props.criterio.descripción}</td>
    <td>{props.criterio.lo_que_se_dará}</td>
    <td>{props.criterio.deducible}</td>
  </tr>
)
class Criterio extends Component {
  constructor() {
    super();
    this.state = {

      criterios: [],
      showModal: false

    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.criteriosShow = this.criteriosShow.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  criteriosShow() {
    this.fetchCriterios(/*this.props.categoria*/)
    this.handleOpenModal()
    //alert(this.state.criterios);
  }
  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <MostrarCriterio criterio={currentCriterio} key={currentCriterio._id} />;
    })
  }
  fetchCriterios() {

    fetch('/api/criterios', {
      method: 'POST',
      body: JSON.stringify({ categoria: this.props.categoria }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        alert(data)
        this.setState({ criterios: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <button onClick={this.criteriosShow} className="btn btn-primary">Ver criterios</button>



        <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
          <div>
            <button onClick={this.handleCloseModal} className="btn btn-danger float-right">Cerrar</button>
            <div>
              <h3>Criterios de la categoria: {this.props.categoria}</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Lo que se dará</th>
                    <th>Deducible</th>
                  </tr>
                </thead>
                <tbody>
                  {this.criteriosList()}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>




    )
  }
}
//--------------------------------------------------------------------------------------------------
export default class CategoriasList extends Component {
  constructor() {
    super();

    this.state = {

      categorias: []
    };
  }

  categoriasList() {
    return this.state.categorias.map(currentCategoria => {
      return <Categoria categoria={currentCategoria} key={currentCategoria._id} />;
    })
  }


  componentDidMount() {
    this.fetchCategorias();
  }

  fetchCategorias() {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => {
        this.setState({ categorias: data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div>
        <h3>Categorias</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nombre</th>
              <th>Editar | | Borrar</th>
            </tr>
          </thead>
          <tbody>
            { this.categoriasList()}
          </tbody>
        </table>
      </div>
    )
  }
}