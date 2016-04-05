"use strict";
import React from "react";
import { IndexLink, Link } from "react-router";
import { MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AuthenticationService from "../../services/authentication/AuthenticationService";


export default class AppNav extends React.Component {



  render() {
    var menuItems = [];
    
    if (!this.props.isAuthenticated) {
      menuItems.push(
        <li>
          <Link to="authentication">Login</Link>
        </li>);
      menuItems.push(<MenuItem>Registrar</MenuItem>);
    }
    else{
      menuItems.push(<MenuItem>Logoff</MenuItem>);
    }
    
    return(
    <NavDropdown id="login-nav-button" title={!this.props.isAuthenticated ? 'Visitante' : 'Autenticado'}>
       {menuItems}
    </NavDropdown>
    );
  }
}