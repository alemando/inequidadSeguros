import React, { Component } from 'react';
import TitlePage from "./title-page.component";
import CategoriasList from "./categorias-list.component";

export default class Categoria extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
    	<div className="container-fluid">
    	    <TitlePage page="Categorias"/>
    	    <div className="row">              
    	        <CategoriasList session={props.session}/>
    	    </div>
    	</div>
    );
  }
}