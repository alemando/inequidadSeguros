import React, { Component } from 'react';

export default class TitlePage extends Component {
  render(){
    return (
      <div className="row">
          <div className="col-xl-12">
              <div className="breadcrumb-holder">
                  <h1 className="main-title float-left">{this.props.page}</h1>
                  <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item">Seguros</li>
                    <li className="breadcrumb-item active">{this.props.page}</li>
                  </ol>
                  <div className="clearfix"></div>
              </div>
          </div>
      </div>
    );
  }
}

