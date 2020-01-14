import React, { Component } from 'react';

import AseguradorasList from "./aseguradoras-list.component";

export default class Cliente extends Component {

  render() {
    return (
        <div>
            <AseguradorasList />
        </div>
    );
  }
}