"use strict";
const BaseStore = require('../BaseStore');
const dispatcher = require("../../dispatcher").default;
const authenticationActions = require("../../actions/authentication/AuthenticationActions");
const events = {
  authenticationSubmitted: "EV_AUTHENTICATION_SUBMITTED",
  authenticationChanged: "EV_AUTHENTICATION_CHANGED"
};

class AuthenticationStore extends BaseStore {
  constructor() {
    super({
      isAuthenticated: false,
      username: '',
      token: '',
      id: ''
    }, events);
  }

  setState(newState) {
    newState = newState || {};

    super.setState({
      isAuthenticated: newState.isAuthenticated,
      username: newState.username,
      token: newState.token,
      id: newState.id
    });
  }

  handleAuthenticate(err, payload) {
    payload = payload || {};
    if (!err) {
      payload.isAuthenticated = true;
    }
    else {
      payload.isAuthenticated = false;
    }

    this.emit(this.events.authenticationSubmitted, err, payload);
    if (this.state.isAuthenticated !== payload.isAuthenticated) {
      this.setState(payload);
      this.emit(this.events.authenticationChanged, null, this.state.isAuthenticated);
    }
  }

  handleActions(action) {
    switch (action.type) {
      case authenticationActions.actions.authenticate: {
        this.handleAuthenticate(action.err, action.payload);
      }
    }
  }
}

const authenticationStore = new AuthenticationStore();
dispatcher.register(authenticationStore.handleActions.bind(authenticationStore));

module.exports = authenticationStore;
