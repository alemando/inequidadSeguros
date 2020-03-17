import React, { Component } from 'react';
import TitlePage from "./title-page.component";
import SegurosList from "./seguros-list.component";

export default class Seguro extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
    	<div className="container-fluid">
    	    <TitlePage page="Seguros"/>
    	    <div className="row">              
    	        <SegurosList session={this.props.session}/>
    	    </div>
    	</div>
    );
  }
}
