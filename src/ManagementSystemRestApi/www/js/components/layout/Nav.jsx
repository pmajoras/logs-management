import React from "react";
import { IndexLink, Link } from "react-router";
import AuthenticationStore from "../../stores/authentication/AuthenticationStore";

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      isAuthenticated: false
    };
  }

  componentWillMount() {
    AuthenticationStore.on("authenticationChanged", this.handleAuthenticationChange.bind(this));
  }

  componentWillUnmount() {
    AuthenticationStore.removeListener("authenticationChanged", this.handleAuthenticationChange.bind(this));
  }

  handleAuthenticationChange(err, credentials) {
    if (!err) {
      this.setState({ isAuthenticated: credentials.isAuthenticated });
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
    const archivesClass = location.pathname.match(/^\/favorites/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const loginClass = location.pathname.match(/^\/authentication/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    const isAuthenticated = this.state.isAuthenticated;

    let mustBeAuthenticatedLinks = [
      <li class={archivesClass}>
        <Link to="welcome" onClick={this.toggleCollapse.bind(this) }>Início</Link>
      </li>,
      <li class={settingsClass}>
        <Link to="settings" onClick={this.toggleCollapse.bind(this) }>Settings</Link>
      </li>
    ];

    let mustNotBeAuthenticatedLinks = [
      <li class={featuredClass}>
        <IndexLink to="/" onClick={this.toggleCollapse.bind(this) }>Todos</IndexLink>
      </li>,
      <li class={loginClass}>
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
