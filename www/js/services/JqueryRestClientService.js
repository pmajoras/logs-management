"use strict";
var $ = require('jquery');
var config = require('../../../config/config');

//https://pgp-todo-app.herokuapp.com/api/
var client = new $.RestClient('https://pgp-todo-app.herokuapp.com/api/', {
  verbs: {
    'post': 'POST',
    'read': 'GET',
    'put': 'PUT',
    'delete': 'DELETE'
  }
});

client.add('authentication', { isSingle: true });
client.authentication.add('authenticate', { isSingle: true });
client.authentication.add('register', { isSingle: true });

client.add('todo');
client.todo.add("boards");

module.exports = {
  client: client,
  authentication: client.authentication,
  boards: client.todo.boards
};