import { EventEmitter } from "events";

class BaseStore extends EventEmitter {
  constructor(initialState) {
    super();
    this.state = initialState || {};
  }

  setState(newState) {

    this.state = newState;
    console.log("newState", newState);
    this.emit("change");
  }

  getState() {
    return this.state;
  }
}

module.exports = BaseStore;
