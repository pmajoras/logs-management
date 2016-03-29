"use strict";
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
const BaseStore = require('./BaseStore');

class TodoStore extends BaseStore {
  constructor() {
    super();
  }

  handleActions() {
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
