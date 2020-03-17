// sidebar.js
import React, { Component } from 'react';

export default class headerbar extends Component {
  render(){
    return (
      <footer className="footer">
        <span className="text-right">
        Copyright <a target="_blank" href="#">Inequidad Seguros</a>
        </span>
        <span className="float-right">
        Powered by <a target="_blank" href="https://www.pikeadmin.com"><b>Pike Admin</b></a>
        </span>
      </footer>
    );
  }
}

