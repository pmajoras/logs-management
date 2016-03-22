const BaseStore = require('../BaseStore');
const dispatcher = require("../../dispatcher").default;
const authenticationActions = require("../../actions/authentication/AuthenticationActions");

class AuthenticationStore extends BaseStore {
  constructor() {
    super({
      isAuthenticated: false,
      username: '',
      token: ''
    });
  }

  handleAuthenticate(err, payload) {
    console.log("sAuthStore", payload);
    this.setState(payload);
    this.emit("authenticationChanged", err, payload);
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
console.log("disp", dispatcher);
dispatcher.register(authenticationStore.handleActions.bind(authenticationStore));

module.exports = authenticationStore;
