"use strict";
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
const BaseStore = require('./BaseStore');

class TodoStore extends BaseStore {
  constructor() {
    super([
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ]);
  }

  createTodo(text) {
    const id = Date.now();
    let todos = this.getState();

    todos.push({
      id,
      text,
      complete: false,
    });

    this.setState(todos);
  }

  getAll() {
    return this.getState();
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
      }
      case "RECEIVE_TODOS": {
        this.setState(action.todos);
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
