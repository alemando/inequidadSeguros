import React, { Component } from 'react';
import TitlePage from "./title-page.component";
import AseguradorasList from "./aseguradoras-list.component";

export default class Cliente extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
    	<div className="container-fluid">
    	    <TitlePage page="Aseguradoras"/>
    	    <div className="row">              
    	        <AseguradorasList session={this.props.session} />
    	    </div>
    	</div>
    );
  }
}