"use strict";
import dispatcher from "../../dispatcher";
const BaseStore = require('../BaseStore');
const todoActions = require("../../actions/todo/TodoActions");
const events = {
  boardsLoaded: "EV_BOARDS_LOADED",
  boardCreated: "EV_BOARD_CREATED"
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

  handleCreateBoard(err, payload) {
    if (!err) {
      let boards = this.getBoards();
      boards.push(payload);
      this.handleGetBoards(null, boards);
    }
    this.emit(this.events.boardCreated, err, payload);
  }

  getBoards() {
    return this.getState().boards || [];
  }

  handleActions(action) {

    switch (action.type) {
      case todoActions.actions.getBoards: {
        this.handleGetBoards(action.err, action.payload);
        break;
      }
      case todoActions.actions.createBoard: {
        this.handleCreateBoard(action.err, action.payload);
        break;
      }
    }
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
