import React, { Component } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            documento: '',
            contrasena: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
    }
    login(e){
        e.preventDefault();
    fetch('/startSession', {
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

          this.setState({
            documento: '',
            contrasena: '',
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

    render(){
        return(
            <div className="container-fluid fondo">
                <div className="container-sm wrapper">
                    <a href="#" className="logo"><img alt="logo" src="assets/images/logoColor.png" /></a>
                    <form id="#formLogin" onSubmit={this.login}>
                        <div className="form-group">
                            <label>* Documento:</label>
                            <input className="form-control" name="documento" type="text" label="documento" onChange={this.handleChange} required value={this.state.documento}></input>
                        </div>
                        <div className="form-group">
                            <label>* Contraseña:</label>
                            <input className="form-control" name="contrasena" type="text" onChange={this.handleChange} required value={this.state.contrasena}></input>
                        </div>
                    </form>
                    <div id="formFooter">
                        <button type="submit" onClick={this.login} form="formLogin" className="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        );
    }
}