import React, { Component } from 'react';
import MejoresVendedores from './admin-mejores-vendedores.component';
export default class Index extends Component {

  render() {
    return (
      <div>
          {this.props.session.esAdmin ? <MejoresVendedores session={this.props.session}></MejoresVendedores> : ""}
      </div>
    );
  }
}