"use strict";
import dispatcher from "../../dispatcher";
const BaseStore = require('../BaseStore');
const formActions = require("../../actions/common/FormActions");
const events = {
  formSubmitted: "EV_FORM_SUBMITTED"
};

class FormStore extends BaseStore {
  constructor() {
    super({}, events);
  }

  handleFormSubmitted(err, payload) {
    this.emit(this.events.formSubmitted, err, payload);
  }

  handleActions(action) {
    console.log("hadndndd", action);
    switch (action.type) {
      case formActions.actions.handleFormSubmission: {
        this.handleFormSubmitted(action.err, action.payload);
      }
    }
  }
}

const formStore = new FormStore();
dispatcher.register(formStore.handleActions.bind(formStore));

export default formStore;
