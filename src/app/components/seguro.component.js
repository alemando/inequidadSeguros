import React, { Component } from 'react';
import TitlePage from "./title-page.component";
import SegurosList from "./seguros-list.component";

export default class Seguro extends Component {

  render() {
    return (
    	<div className="container-fluid">
    	    <TitlePage page="Seguros"/>
    	    <div className="row">              
    	        <SegurosList />
    	    </div>
    	</div>
    );
  }
}
