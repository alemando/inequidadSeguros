import React, { Component } from 'react';

import VendedoresList from "./vendedores-list.component";
import CreateVendedor from "./create-vendedor.component";
import DeleteVendedor from "./delete-vendedor.component";
import VendedorById from "./vendedor-by-id.component";
import UpdateVendedor from "./vendedor-update.component";


export default class Vendedor extends Component {

  render() {
    return (
        <div>
            <CreateVendedor/>
            <VendedoresList/>
            <DeleteVendedor/>
            <VendedorById/>
            <UpdateVendedor/>
        </div>
    );
  }
}