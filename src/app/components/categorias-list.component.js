import React, { Component } from 'react';

const Categoria = props => (
  <tr>
    <td>{props.categoria.nombre}</td>
  </tr>
)

export default class CategoriasList extends Component {
  constructor() {
    super();

    this.state = {categorias: []};
  }

    categoriasList() {
        return this.state.categorias.map(currentCategoria => {
            return <Categoria categoria={currentCategoria} key={currentCategoria._id}/>;
        })
    }

  
    componentDidMount(){
        this.fetchCategorias();
    }

    fetchCategorias() {
        fetch('/api/categorias')
            .then(res => res.json())
            .then(data => {
                this.setState({categorias: data});
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
              <th>nombre</th>
            </tr>
          </thead>
          <tbody>
            { this.categoriasList() }
          </tbody>
        </table>
      </div>
    )
  }
}