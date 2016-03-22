
class ActionResponse {

  constructor(actionType, payload, error) {
    this.type = actionType;
    this.payload = payload;
    this.err = error;
  }
}

module.exports = ActionResponse;