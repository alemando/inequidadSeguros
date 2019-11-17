import React, { Component } from 'react';
import CreateAseguradora from "./create-aseguradora.component";

const Aseguradora = props => (
  <tr>
    <td>{props.aseguradora.nit}</td>
    <td>{props.aseguradora.nombre}</td>
    <td>{props.aseguradora.telefono}</td>
    <td>{props.aseguradora.correo}</td>
  </tr>
)

export default class AseguradorasList extends Component {
  constructor() {
    super();

    this.state = {aseguradoras: []};
  }

    aseguradorasList() {
        return this.state.aseguradoras.map(currentAseguradora => {
            return <Aseguradora aseguradora={currentAseguradora} key={currentAseguradora._id}/>;
        })
    }

    componentDidMount(){
        this.fetchAseguradoras();
    }

    fetchAseguradoras() {
        fetch('/api/aseguradoras')
            .then(res => res.json())
            .then(data => {
                this.setState({aseguradoras: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="card mb-3">
            <div className="card-header">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-8 col-lg-10 col-xl-10">
                        <h3><i className="fa fa-handshake-o"></i> Aseguradoras disponibles</h3>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                        <CreateAseguradora component={this}/>
                    </div>
                </div>
            </div>
                
            <div className="card-body">
                <div className="table-responsive">
                <table id="tabla-aseguradoras" className="table table-bordered table-hover display">
                    <thead>
                        <tr>
                            <th><center>nit</center></th>
                            <th><center>nombre</center></th>
                            <th><center>telefono</center></th>
                            <th><center>correo</center></th>
                        </tr>
                    </thead>                                        
                    <tbody>
                        {this.aseguradorasList()}
                    </tbody>
                </table>
                </div>
                
            </div>                                                      
        </div>
      </div>
    )
  }
}