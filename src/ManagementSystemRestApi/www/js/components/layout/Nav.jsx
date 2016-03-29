"use strict";
import React from "react";
import { IndexLink, Link } from "react-router";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";
import AuthenticationService from "../../services/authentication/AuthenticationService";
export default class Nav extends React.Component {
  constructor() {
    super();
    let authenticationService = new AuthenticationService();

    this.state = {
      collapsed: true,
      isAuthenticated: authenticationService.isAuthenticated()
    };
  }

  componentWillMount() {
    AuthenticationStore.on(AuthenticationStore.events.authenticationChanged, this.handleAuthenticationChange.bind(this));
  }

  componentWillUnmount() {
    AuthenticationStore.removeListener(AuthenticationStore.events.authenticationChanged, this.handleAuthenticationChange.bind(this));
  }

  handleAuthenticationChange(err, isAuthenticated) {
    if (!err) {
      this.setState({ isAuthenticated: isAuthenticated });
    }
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const welcomeClass = location.pathname.match(/^\/welcome/) ? "active" : "";
    const todoClass = location.pathname.match(/^\/todo/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const loginClass = location.pathname.match(/^\/authentication/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    const isAuthenticated = this.state.isAuthenticated;

    let mustBeAuthenticatedLinks = [
      <li key="1" class={welcomeClass}>
        <Link to="welcome" onClick={this.toggleCollapse.bind(this) }>Início</Link>
      </li>,
      <li key="2" class={todoClass}>
        <Link to="todo/boards" onClick={this.toggleCollapse.bind(this) }>Todos</Link>
      </li>,
      <li key="3" class={settingsClass}>
        <Link to="settings" onClick={this.toggleCollapse.bind(this) }>Settings</Link>
      </li>
    ];

    let mustNotBeAuthenticatedLinks = [
      <li key="4" class={featuredClass}>
        <IndexLink to="/" onClick={this.toggleCollapse.bind(this) }>Todos</IndexLink>
      </li>,
      <li key="5" class={loginClass}>
        <Link to="authentication" onClick={this.toggleCollapse.bind(this) }>Login</Link>
      </li>
    ];

    let linksThatAllCanUse = [];
    if (isAuthenticated) {
      linksThatAllCanUse = linksThatAllCanUse.concat(mustBeAuthenticatedLinks);
    }
    else {
      linksThatAllCanUse = linksThatAllCanUse.concat(mustNotBeAuthenticatedLinks);
    }

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this) } >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              {linksThatAllCanUse}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
