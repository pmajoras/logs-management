const BaseStore = require('../BaseStore');
const dispatcher = require("../dispatcher");

class AuthenticationStore extends BaseStore {
  constructor() {
    super();
    this.setState({
      isAuthenticated: false,
      username: '',
      token: ''
    });
  }

  handleActions(action) {
    console.log("handlerACtions", action);
  }
}

const authenticationSTore = new AuthenticationStore();
dispatcher.register(authenticationSTore.handleActions.bind(authenticationSTore));

module.exports = authenticationSTore;
