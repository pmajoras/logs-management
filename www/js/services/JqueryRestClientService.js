"use strict";
var $ = require('jquery');
var config = require('../../../config/config');

var client = new $.RestClient('http://localhost:8085/api/', {
  verbs: {
    'post': 'POST',
    'read': 'GET',
    'put': 'PUT',
    'delete': 'DELETE'
  }
});

client.add('authentication', { isSingle: true });
client.authentication.add('authenticate', { isSingle: true });
client.add('todo');
client.todo.add("boards");

module.exports = {
  client: client,
  authentication: client.authentication,
  boards: client.todo.boards
};