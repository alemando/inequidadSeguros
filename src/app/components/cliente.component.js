import React, { Component } from 'react';

import ClientesList from "./clientes-list.component";

export default class Cliente extends Component {

  render() {
    return (
        <div>
            <ClientesList />
        </div>
    );
  }
}