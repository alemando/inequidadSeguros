import React, { Component } from 'react';

import SegurosList from "./seguros-list.component";
import CreateSeguro from "./create-seguro.component";

export default class Seguro extends Component {

  render() {
    return (
        <div>
            <SegurosList />
            <CreateSeguro />
        </div>
    );
  }
}
