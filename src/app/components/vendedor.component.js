import React, { Component } from 'react';
import TitlePage from "./title-page.component";
import VendedoresList from "./vendedores-list.component";

export default class Vendedor extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
    	<div className="container-fluid">
    	    <TitlePage page="Vendedores"/>
    	    <div className="row">              
    	        <VendedoresList/>
    	    </div>
    	</div>
    );
  }
}