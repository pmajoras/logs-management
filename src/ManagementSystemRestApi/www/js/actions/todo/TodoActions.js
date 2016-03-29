"use strict";
import dispatcher from "../../dispatcher";
import ActionResponse from "../ActionResponse";
import BoardService from "../../services/boards/BoardService";
import AuthenticationService from "../../services/authentication/AuthenticationService";

var actions = {
  getBoards: "GET_BOARDS"
};

module.exports = {
  actions: actions,
  getBoards: function() {
    let service = new BoardService();
    let authenticationService = new AuthenticationService();

    service.getBoards(authenticationService.getUserId())
      .then((data) => {
        console.log("data", data);
        dispatcher.dispatch(new ActionResponse(null, actions.getBoards, data));
      }, (err) => {
        console.log("err12312", err);

        dispatcher.dispatch(new ActionResponse(err, actions.getBoards));
      });
  }
};
