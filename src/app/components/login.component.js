import React, { Component } from 'react';
import Swal from 'sweetalert2'
import App from '../App';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            documento: '',
            contrasena: '',
            session: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.validSession = this.validSession.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
    }

    componentDidMount(){
        this.validSession()
    }

    validSession(){
        fetch('/showSession')
        .then(res => res.json())
        .then(data => {
            this.setState({ session: data });
        })
        .catch(err => console.error(err));
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
                this.setState({
                    documento: '',
                    contrasena: '',
                });

            } else if (data.id == 1) {

                Swal.fire({
                    text: data.mensaje,
                    type: 'success',
                })

                this.setState({
                    documento: '',
                    contrasena: '',
                });
                this.validSession()
            } else {
                Swal.fire({
                    text: data.mensaje,
                    type: 'error'
                })
                this.setState({
                    documento: '',
                    contrasena: '',
                });
            }
        })
        .catch(err => console.error(err));
    }

    render(){
        if(this.state.session == null){
            return(
            <div className="fondo">
            <div className="container-fluid card-body">
            <div className="container wrapper container-logo">
                <a href="#" className="logo"><img alt="logo" src="assets/images/logoColor.png" /></a>
                <form id="#formLogin" onSubmit={this.login}>
                    <div className="form-group">
                        <label>* Documento:</label>
                        <input className="form-control" name="documento" type="text" label="documento" onChange={this.handleChange} required value={this.state.documento}></input>
                    </div>
                    <div className="form-group">
                        <label>* Contraseña:</label>
                        <input className="form-control" name="contrasena" type="password" onChange={this.handleChange} required value={this.state.contrasena}></input>
                    </div>
                </form>
                <div id="formFooter">
                    <button type="submit" onClick={this.login} form="formLogin" className="btn btn-primary">Enviar</button>
                </div>  
            </div>
            </div>
        
        </div>
        )
        }else{
            return(<App session={this.state.session}/>)
        }
            
        
    }
}