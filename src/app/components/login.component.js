import React, { Component } from 'react';
import $ from 'jquery';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            documento: '',
            contrasena: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
      }

    render(){
        return(
            <div className="container-fluid fondo">
                <div className="container-sm wrapper">
                    <a href="/index" className="logo"><img alt="logo" src="assets/images/logoColor.png" /></a>
                    <form id="#formLogin" onSubmit={this.login}>
                        <div className="form-group">
                            <label>* Documento:</label>
                            <input name="documento" type="text" label="documento" onChange={this.handleChange} required value={this.state.documento}></input>
                        </div>
                        <div className="form-group">
                            <label>* Contraseña:</label>
                            <input name="contraseña" type="text" onChange={this.handleChange} required value={this.state.contrasena}></input>
                        </div>
                    </form>
                    <div id="formFooter">
                        <button type="submit" form="formLogin" className="btn btn-primary">Enviar</button>
                    </div>
                    <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
            </div>
        );
    }
}