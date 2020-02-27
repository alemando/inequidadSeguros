import React, { Component } from 'react';

import BienesList from "./bienes-list.component";
import CreateBien from "./create-bien.component";

export default class Bien extends Component {
  constructor(props) {
		super(props);
	}
  render() {
    return (
        <div>
          <BienesList></BienesList>
            <CreateBien />
        </div>
    );
  }
}