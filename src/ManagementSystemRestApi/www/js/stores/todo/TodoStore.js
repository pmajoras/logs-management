"use strict";
import dispatcher from "../../dispatcher";
const BaseStore = require('../BaseStore');
const todoActions = require("../../actions/todo/TodoActions");
const events = {
  boardsLoaded: "EV_BOARDS_LOADED"
};

class TodoStore extends BaseStore {
  constructor() {
    super({ boards: [] }, events);
  }

  handleGetBoards(err, payload) {

    if (!err) {
      this.setState({ boards: payload });
    }
    this.emit(this.events.boardsLoaded, err, payload);
  }

  getBoards() {
    return this.getState().boards || [];
  }

  handleActions(action) {
    switch (action.type) {
      case todoActions.actions.getBoards: {
        this.handleGetBoards(action.err, action.payload);
      }
    }
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
