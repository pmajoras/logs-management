"use strict";
import dispatcher from "../../dispatcher";
import ActionResponse from "../ActionResponse";

var actions = {
  handleFormSubmission: "HANDLE_FORM_SUBMISSION"
};

module.exports = {
  actions: actions,
  handleFormSubmission: function(err, formId) {

    setTimeout(function() {
      dispatcher.dispatch(new ActionResponse(err, actions.handleFormSubmission, formId));
    }, 1);
  }
};
