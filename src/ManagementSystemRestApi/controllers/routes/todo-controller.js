"use strict";
var RouteFactory = require('../route-factory');
var BaseController = require('../base-controller');
var mustAuthorizeWithId = require('../../middlewares/general-middlewares/must-authorize-with-id');
var TodoService = require('../../application-services/todo-service');

class TodoController extends BaseController {
  constructor() {
    super();
    this.todoService = new TodoService();
  }

  getBoards(req, res, next) {
    this.todoService.getBoardsByUserId(req.params.id)
      .then((boards) => {
        res.setJsonResponse(boards);
        next();
      }, (err) => {
        next(err);
      });
  }

  createBoard(req, res, next) {
    this.todoService.createBoard({ userId: req.params.id, name: req.body.name, description: req.body.description })
      .then((newBoard) => {
        res.setJsonResponse(newBoard);
        next();
      }, (err) => {
        next(err);
      });
  }
}

var routeFactory = new RouteFactory("/todo/:id/")
  .get("boards", "getBoards", mustAuthorizeWithId)
  .post("boards", "createBoard", mustAuthorizeWithId);

module.exports = { "Controller": TodoController, "routeFactory": routeFactory };