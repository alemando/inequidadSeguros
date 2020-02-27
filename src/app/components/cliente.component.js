import React, { Component } from 'react';
import TitlePage from "./title-page.component";
import ClientesList from "./clientes-list.component";

export default class Cliente extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
    	<div className="container-fluid">
    	    <TitlePage page="Clientes"/>
    	    <div className="row">              
    	        <ClientesList session={this.props.session}/>
    	    </div>
    	</div>
    );
  }
}