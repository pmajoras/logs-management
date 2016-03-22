import dispatcher from "../../dispatcher";
import ActionResponse from "../ActionResponse";

var authenticationActions = {
  authenticate: "AUTHENTICATE_USER"
};

module.exports = {
  actions: authenticationActions,
  authenticate: function(authenticateModel) {

    dispatcher.dispatch(new ActionResponse(authenticationActions.authenticate, {
      isAuthenticated: true,
      username: authenticateModel.username,
      token: 'TESTE_TOKEN'
    }));
  }
};
