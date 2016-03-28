"use strict";
import { EventEmitter } from "events";

class BaseStore extends EventEmitter {
  constructor(initialState) {
    super();
    this.state = initialState || {};
  }

  setState(newState) {

    this.state = newState;
    this.emitStateChanges("change");
  }

  getState() {
    return this.state;
  }

  emitStateChanges(eventName) {
    this.emit(eventName, this.getState());
  }
}

module.exports = BaseStore;
